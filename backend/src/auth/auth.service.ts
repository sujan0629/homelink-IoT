import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Resend } from 'resend';
import type { TUser } from 'shared/src/types/User/User';

@Injectable()
export class AuthService {
    private readonly resend: Resend;

    constructor(
        @InjectModel('User') private userModel: Model<TUser>,
        @InjectModel('VerificationCode') private verificationCodeModel: Model<any>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {
        const apiKey = this.configService.get<string>('RESEND_API_KEY');
        if (!apiKey) {
            throw new Error('RESEND_API_KEY is not defined in environment variables');
        }
        this.resend = new Resend(apiKey);
    }

    async checkEmail(email: string): Promise<{ exists: boolean; message: string }> {
        const user = await this.userModel.findOne({ email });
        if (user) {
            return { exists: true, message: 'User already exists' };
        }
        return { exists: false, message: 'User does not exist' };
    }

    async sendVerificationCode(email: string): Promise<void> {
        if (!email || !email.includes('@')) {
            throw new BadRequestException('Invalid email address');
        }
        const code = Math.random().toString().slice(2, 8);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Store verification code
        await this.verificationCodeModel.updateOne(
            { email },
            { email, code, expiresAt },
            { upsert: true }
        );

        // Send email using Resend
        try {
            const fromEmail = this.configService.get<string>('RESEND_FROM_EMAIL');
            if (!fromEmail) {
                throw new Error('RESEND_FROM_EMAIL is not defined in environment variables');
            }

            const response = await this.resend.emails.send({
                from: `HomeLink <${fromEmail}>`,
                to: email,
                subject: 'Your HomeLink Verification Code',
                html: `<p>Your verification code is: <strong>${code}</strong></p><p>This code will expire in 10 minutes.</p>`,
                text: `Your verification code is: ${code}. This code will expire in 10 minutes.`,
            });

            if (!response || response.error) {
                console.error('Failed to send email:', response?.error || response);
                throw new BadRequestException(response?.error?.message || 'Failed to send verification code');
            }
            console.log('Resend accepted email:', response.data?.id);
        } catch (error) {
            console.error('Failed to send email:', error);
            throw new BadRequestException('Failed to send verification code');
        }
    }

    async verifyCode(email: string, code: string): Promise<void> {
        const record = await this.verificationCodeModel.findOne({ email });

        if (!record) {
            throw new BadRequestException('No verification code found for this email');
        }

        if (record.code !== code) {
            throw new BadRequestException('Invalid verification code');
        }

        if (new Date() > record.expiresAt) {
            throw new BadRequestException('Verification code has expired');
        }

        // Code is valid, delete it
        await this.verificationCodeModel.deleteOne({ email });
    }

    async resendCode(email: string): Promise<void> {
        await this.sendVerificationCode(email);
    }

    async signup(email: string, password: string, name: string = 'User'): Promise<{ token: string; user: Partial<TUser> }> {
        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new BadRequestException('User already exists with this email');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.userModel.create({
            email,
            password: hashedPassword,
            name,
        });

        const token = this.jwtService.sign({ email: user.email, sub: user._id });

        return {
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }

    async login(email: string, password: string): Promise<{ token: string; user: Partial<TUser> }> {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtService.sign({ email: user.email, sub: user._id });

        return {
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('check-email')
    async checkEmail(@Body() body: { email: string }) {
        return this.authService.checkEmail(body.email);
    }

    @Post('send-code')
    async sendCode(@Body() body: { email: string }) {
        await this.authService.sendVerificationCode(body.email);
        return { message: 'Verification code sent to your email' };
    }

    @Post('verify-code')
    async verifyCode(@Body() body: { email: string; code: string }) {
        await this.authService.verifyCode(body.email, body.code);
        return { message: 'Code verified successfully' };
    }

    @Post('resend-code')
    async resendCode(@Body() body: { email: string }) {
        await this.authService.resendCode(body.email);
        return { message: 'Verification code resent to your email' };
    }

    @Post('signup')
    async signup(@Body() body: { email: string; password: string; name?: string }) {
        return this.authService.signup(body.email, body.password, body.name);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }
}

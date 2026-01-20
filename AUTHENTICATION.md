# Authentication System Documentation

## Overview
The HomeLink application uses a secure, email-based authentication system with verification codes. The system supports both user signup and login flows with password-based authentication and JWT tokens.

## Architecture

### Backend Stack
- **Framework**: NestJS
- **Database**: MongoDB
- **Email Service**: Resend
- **Authentication**: JWT + Bcrypt
- **Key Libraries**: @nestjs/jwt, bcrypt, resend

## Authentication Flow

### New User Signup
1. **Email Check** → User enters email, system checks if account exists
2. **Account Creation Alert** → If new, user is prompted to create account
3. **Code Verification** → 6-digit code sent to email (10-min expiry)
4. **Password Setup** → User creates secure password (8+ chars, uppercase, lowercase, number)
5. **Account Created** → User logged in and redirected to Home

### Existing User Login
1. **Email Check** → User enters email, system recognizes existing account
2. **Password Entry** → User enters password
3. **Authentication** → Credentials validated, JWT token issued
4. **Home Access** → User logged in and redirected to Home

## API Endpoints

### `/auth/check-email` (POST)
Checks if email exists in system.
```json
Request: { "email": "user@example.com" }
Response: { "exists": boolean, "message": string }
```

### `/auth/send-code` (POST)
Sends 6-digit verification code to email.
```json
Request: { "email": "user@example.com" }
Response: { "message": "Verification code sent to your email" }
```

### `/auth/verify-code` (POST)
Validates the 6-digit verification code.
```json
Request: { "email": "user@example.com", "code": "123456" }
Response: { "message": "Code verified successfully" }
```

### `/auth/resend-code` (POST)
Resends verification code if expired.
```json
Request: { "email": "user@example.com" }
Response: { "message": "Verification code resent to your email" }
```

### `/auth/signup` (POST)
Creates new user account with password.
```json
Request: { "email": "user@example.com", "password": "SecurePass123", "name": "User" }
Response: { "token": "jwt_token", "user": { "_id": "...", "email": "...", "name": "..." } }
```

### `/auth/login` (POST)
Authenticates existing user.
```json
Request: { "email": "user@example.com", "password": "SecurePass123" }
Response: { "token": "jwt_token", "user": { "_id": "...", "email": "...", "name": "..." } }
```

## Database Models

### User Schema
- `email` (String, unique, required)
- `name` (String, required)
- `password` (String, hashed with bcrypt, required)
- `timestamps` (createdAt, updatedAt)

### VerificationCode Schema
- `email` (String)
- `code` (String, 6-digit)
- `expiresAt` (Date, 10 minutes from creation, auto-deletes)

## Security Features
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens with 7-day expiration
- Verification codes expire after 10 minutes
- Email validation on all authentication requests
- Password requirements: 8+ characters, uppercase, lowercase, number

## Environment Variables

### Backend
```
MONGODB_URI=mongodb://localhost:27017/homelink
JWT_SECRET=your-secret-key
RESEND_API_KEY=your-resend-api-key
PORT=3000
```

### Mobile
```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

## User Journey Diagram

```
Welcome Screen
    ↓
AuthEmail Screen (Enter Email)
    ↓
Check Email API
    ├─→ User Exists → PasswordLogin Screen → Login API → Home
    └─→ New User → Confirmation Alert
                      ↓
                   Accept → Send Code API → VerifyCode Screen
                                              ↓
                                           Verify Code API
                                              ↓
                                           SetPassword Screen
                                              ↓
                                           Signup API → Home
```

## Key Features
- **Magic Link Removed**: Simple email verification with 6-digit codes
- **Responsive UI**: All auth screens include loading states and error handling
- **Email Validation**: Resend integration for reliable email delivery
- **Auto-focus**: 6-digit code input with auto-focus on next field
- **Password Requirements**: Clear validation with helpful error messages
- **Token-based Sessions**: JWT tokens for stateless authentication

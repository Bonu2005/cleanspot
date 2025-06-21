import {
  ActivateDto,
  CreateAuthDto,
  LoginDto,
  RefreshTokenDto,
  ResetPasswordDto,
  SendOtpDto,
  UpdateFcmTokenDto,
} from './dto/create-auth.dto';
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '../authguard/authguard.guard';
import { RefreshGuard } from '../authguard/refresh.guard';
import { RolesGuard } from '../authguard/roles.guard';
import { Roles } from '../authguard/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизация' })
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.authService.login(loginDto, req);
  }

  @Post('activate')
  @ApiOperation({ summary: 'Активация аккаунта по OTP' })
  activate(@Body() activateDto: ActivateDto) {
    return this.authService.activate(activateDto);
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Отправка OTP на номер' })
  sendOTP(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOTP(sendOtpDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Сброс пароля' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('refresh-token')
  @UseGuards(RefreshGuard)
  @ApiOperation({ summary: 'Обновление access токена' })
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  @Post('super-admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Доступ только для админа' })
  superAdmin(@Body() superAdminDto: SendOtpDto) {
    return this.authService.superAdmin(superAdminDto);
  }
  @Post('update-fcm-token')
  @UseGuards(AuthGuard, RolesGuard)
  updateFcmToken(@Body() dto: UpdateFcmTokenDto, @Req() req) {
    return this.authService.updateFcmToken(req.user.id, dto.fcmToken);
  }
}

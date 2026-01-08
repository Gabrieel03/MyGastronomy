import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importações do Swagger
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { LoginDto } from '../dto/login.dto';

@ApiTags('Auth') // Cria a categoria "Auth" no Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Usa a estratégia Local (email/senha) para validar antes
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza o login e retorna o Token JWT' }) // Descrição
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Email ou senha incorretos.' })
  async login(@Body() loginDto: LoginDto) { // @Body faz o Swagger mostrar o formulário JSON
    // O LocalAuthGuard já valida o usuário e coloca no request
    // Aqui nós apenas pegamos esse usuário validado e geramos o token
    // Como o Guard Local já validou, podemos chamar o login direto com os dados do DTO ou user do request
    return this.authService.login(loginDto);
  }
}
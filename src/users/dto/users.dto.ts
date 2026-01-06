import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: "João Silva",
        description: "Nome completo do usuário"
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: "gabrielteste@gmail.com",
        description: "E-mail do usuário"
    })
    @IsEmail({}, { message: 'O e-mail informado é inválido' })
    email: string;


    @ApiProperty({
        example: "Senha@123",
        description: "Senha com letras maiúsculas, minúsculas, números e símbolos",
        minLength: 6
    })
    @IsStrongPassword({ minLength: 6, minSymbols: 1, minUppercase: 1, minNumbers: 1 },
        { message: 'A senha é muito fraca. Use letras maiúsculas, minúsculas, números e símbolos' }
    )
    password: string;


    @ApiProperty({
        example: 'https://minhafoto.com/perfil.jpg',
        description: 'URL da foto de perfil (Opcional)',
        required: false,
    })
    @IsOptional()
    @IsString()
    foto?: string;


    @ApiProperty({
        example: 'user',
        description: 'Define se é user ou admin (Opcional, padrão é user)',
        required: false,
    })
    @IsOptional()
    role?: string;
}
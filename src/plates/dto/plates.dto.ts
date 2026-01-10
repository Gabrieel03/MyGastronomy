import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreatePlateDto {

    @ApiProperty({ example: 'Macarrão à Carbonara', description: 'Nome do prato' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Massa fresca com molho branco e bacon', description: 'Detalhes do prato' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 45.90, description: 'Preço em reais' })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @ApiProperty({ example: 'Refeição', description: 'Categoria do item' })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({ example: ['massa', 'ovo', 'bacon', 'queijo'], description: 'Lista de ingredientes' })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    ingredients: string[];

    @ApiProperty({ example: 10, description: 'Quantidade em estoque' })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ example: 'https://site.com/foto-macarrao.jpg', description: 'URL da imagem' })
    @IsString()
    @IsOptional()
    image: string;

}
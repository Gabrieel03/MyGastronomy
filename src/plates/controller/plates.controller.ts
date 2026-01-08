import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { CreatePlateDto } from '../dto/plates.dto';
import { UpdatePlateDto } from '../dto/update-plates.dto';
import { PlatesService } from '../service/plates.service';

@ApiTags('Plates')
@Controller('plates')
export class PlatesController {
    constructor(private readonly platesService: PlatesService) { }

    @Get()
    @ApiOperation({ summary: 'Lista todos os pratos do cardápio' })
    findAll() {
        return this.platesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca um prato pelo ID (Ex: 001)' })
    findOne(@Param('id') id: string) {
        return this.platesService.findOne(id);
    }

    // --- ROTAS PROTEGIDAS (Apenas Admin) ---

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth() // Mostra o cadeado no Swagger
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastra um novo prato (Admin)' })
    create(@Body() createPlateDto: CreatePlateDto) {
        return this.platesService.create(createPlateDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualiza dados de um prato (Admin)' })
    update(@Param('id') id: string, @Body() updatePlateDto: UpdatePlateDto) {
        return this.platesService.update(id, updatePlateDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove um prato do cardápio (Admin)' })
    remove(@Param('id') id: string) {
        return this.platesService.remove(id);
    }
}
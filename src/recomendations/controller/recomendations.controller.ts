import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RecomendationsService } from "../service/recomendations.service";

@ApiTags('recomendations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recomendations')
export class RecomendationsController {
    constructor(private readonly recomendationsService: RecomendationsService) { }

    @Get()
    @ApiOperation({ summary: 'Pede uma recomendação de bebida para a IA' })
    @ApiQuery({ name: 'meal', description: 'O nome do prato que você vai comer (Ex: Carbonara)', required: true })
    getRecomendation(@Query('meal') meal: string) {
        return this.recomendationsService.getRecommendation(meal);
    }
}
import { Module } from "@nestjs/common";
import { PlatesModule } from "../plates/plates.module";
import { RecomendationsController } from "./controller/recomendations.controller";
import { RecomendationsService } from "./service/recomendations.service";

@Module({
    imports: [PlatesModule],
    controllers: [RecomendationsController],
    providers: [RecomendationsService]
})
export class RecomendationsModule { }
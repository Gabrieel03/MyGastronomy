import { PartialType } from '@nestjs/swagger';
import { CreatePlateDto } from './plates.dto';

export class UpdatePlateDto extends PartialType(CreatePlateDto) { }
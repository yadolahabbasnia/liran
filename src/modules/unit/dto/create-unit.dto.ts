/* eslint-disable @moneteam/nestjs/all-properties-are-whitelisted */
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

import { AbstractDto } from "../../../common/dto/abstract.dto";
import { UnitTypes } from "../constants";

export class CreateUnitDto extends AbstractDto {
  @IsString()
  titleFa: string;

  @IsString()
  titleEn: string;

  @IsString()
  symbol: string;

  @IsString()
  dimensionId: string;

  @IsEnum({ enum: UnitTypes })
  type: string;

  @IsInt()
  @IsOptional()
  rate: string;

  @IsString()
  @IsOptional()
  convertToFormula: string;

  @IsString()
  @IsOptional()
  convertFromFormula: string;

  @IsBoolean()
  @IsOptional()
  isMain: boolean;

  @IsString()
  @IsOptional()
  parentId: string;
}

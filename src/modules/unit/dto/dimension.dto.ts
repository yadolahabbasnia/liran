/* eslint-disable @moneteam/nestjs/all-properties-are-whitelisted */
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';

export class DimensionDto extends AbstractDto {
  @IsString()
  titleFa: string;

  @IsString()
  titleEn: string;

  units: UnitDto[];

  constructor(unit: Unit) {
    super(unit);
    this.titleFa = unit.titleFa;
    this.titleEn = unit.titleEn;
    this.symbol = unit.symbol;
    this.dimensionId = unit.dimensionId;
    this.type = unit.type;
    this.rate = unit.rate;
    this.convertToFormula = unit.convertToFormula;
    this.convertFromFormula = unit.convertFromFormula;
    this.isMain = unit.isMain;
    this.parentId = unit.parentId;

    if (unit.children) {
      this.children = unit.children.toDtos();
    }

    if (unit.parent) {
      this.parent = unit.parent;
    }
  }
}

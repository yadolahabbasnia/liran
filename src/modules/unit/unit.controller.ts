import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUnitDto } from "./dto/create-unit.dto";
import type { UnitDto } from "./dto/unit.dto";
import { UnitService } from "./unit.service";

@Controller("units")
@ApiTags("units")
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Post()
  @ApiResponse()
  create(@Body() unit: CreateUnitDto): Promise<UnitDto> {
    return this.unitService.create(unit);
  }

  @Get()
  @ApiResponse()
  readAll(): Promise<UnitDto[]> {
    return this.unitService.readAll();
  }

  @Get(":id")
  @ApiResponse()
  read(@Param("id") id: string): Promise<UnitDto> {
    return this.unitService.read(id);
  }

  @Patch(":id")
  @ApiResponse()
  update(
    @Body() unit: CreateUnitDto,
    @Param("id") id: string
  ): Promise<UnitDto> {
    return this.unitService.update(id, unit);
  }

  @Delete(":id")
  @ApiResponse()
  async delete(@Param("id") id: string): Promise<void> {
    this.unitService.delete(id);
  }
}

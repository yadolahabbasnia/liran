import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UnitRepository } from "./unit.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UnitRepository])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}

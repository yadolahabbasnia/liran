import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { DimensionDto } from './dto/dimension.dto';
import { Unit } from './unit.entity';

@Entity()
@UseDto(DimensionDto)
export class Dimension extends AbstractEntity<DimensionDto> {
  @Column()
  titleFa: string;

  @Column()
  titleEn: string;

  @OneToMany(() => Unit, (unit) => unit.dimension)
  units: Unit[];
}

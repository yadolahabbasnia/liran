/* eslint-disable sonarjs/no-identical-expressions */
/* eslint-disable no-eval */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { UnitTypes } from './constants';
import { Dimension } from './dimension.entity';
import { UnitDto } from './dto/unit.dto';

@Entity()
@UseDto(UnitDto)
@Unique('uniq-unit', ['symbol', 'titleEn', 'dimensionId', 'type'])
export class Unit extends AbstractEntity<UnitDto> {
  @Column()
  titleFa: string;

  @Column()
  titleEn: string;

  @Column()
  symbol: string;

  @Column()
  dimensionId: string;

  @Column({ enum: UnitTypes, default: UnitTypes.BASIC })
  type: string;

  @Column({ nullable: true })
  rate: number;

  @Column({ nullable: true })
  convertFromFormula: string;

  @Column({ nullable: true })
  convertToFormula: string;

  @Column({ nullable: true })
  isMain: boolean;

  @Column({ nullable: true })
  parentId: string;

  @OneToMany(() => Unit, (unit) => unit.parent)
  children: Unit[];

  @ManyToOne(() => Unit, (unit) => unit.children)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parent: Unit;

  @ManyToOne(() => Dimension, (dimension) => dimension.units)
  @JoinColumn({ name: 'dimension_id', referencedColumnName: 'id' })
  dimension: Dimension;

  @BeforeInsert()
  @BeforeUpdate()
  private validateFormula() {
    if (this.isMain === true && this.parent) {
      throw new Error('The main unit can not be a subset');
    }

    if (this.isMain === false && !this.parent) {
      throw new Error('parent is required');
    }

    if (
      this.type === UnitTypes.FORMULATED &&
      (!this.convertFromFormula.match('^a|d|(|([-+/*]d+(.d+)?)/)|)') ||
        !this.convertFromFormula.match('^a|d|(|([-+/*]d+(.d+)?)/)|)'))
    ) {
      throw new Error('formola is wrong!');
    }
  }

  calculateRate(obj) {
    return obj.isMain === true
      ? obj.rate
      : obj.rate * this.calculateRate(obj.parent);
  }

  convertBasicMethod() {
    return this.calculateRate(this);
  }

  convertToFormulaMethod(a: number) {
    this.convertToFormula = this.convertToFormula.replace('a', String(a));

    return eval(this.convertToFormula);
  }

  convertFromFormulaMethod(a: number) {
    this.convertFromFormula = this.convertFromFormula.replace('a', String(a));

    return eval(this.convertFromFormula);
  }
}

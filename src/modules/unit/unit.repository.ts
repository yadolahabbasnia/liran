import { EntityRepository, Repository } from "typeorm";

import { Unit } from "./unit.entity";

@EntityRepository(Unit)
export class UnitRepository extends Repository<Unit> {}

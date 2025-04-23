import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'user_data' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  age!: number;
}
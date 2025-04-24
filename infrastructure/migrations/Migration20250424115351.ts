import { Migration } from '@mikro-orm/migrations';

export class Migration20250424120000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      create table "user_data" (
        "id" serial primary key,
        "name" varchar(255) not null,
        "email" varchar(255) unique not null,
        "age" int not null
      );
    `);
  }

  override async down(): Promise<void> {
    this.addSql('drop table "user_data";');
  }
}
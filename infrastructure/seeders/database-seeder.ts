import { Seeder } from '@mikro-orm/seeder';
import { UserSeeder } from './UserSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em) {
    return em.call(UserSeeder);
  }
}
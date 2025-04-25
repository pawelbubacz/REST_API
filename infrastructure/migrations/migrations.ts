import { Client } from 'pg';
import logger from '../../src/logger';
import * as dotenv from 'dotenv';
dotenv.config();


const DB_NAME = 'users';

async function createDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  await client.connect();
  await client.query(`CREATE DATABASE ${DB_NAME} WITH ENCODING 'UTF8'`);
  await client.end();
  logger.info(`Database "${DB_NAME}" created.`);
}

async function migrate() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS user_data (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      age INT NOT NULL
    );
  `);

  await client.query(`
    INSERT INTO user_data (name, email, age) VALUES
  ('Jan Kowalski', 'jan.kowalski@example.com', 30),
  ('Anna Nowak', 'anna.nowak@example.com', 25),
  ('Piotr Wiśniewski', 'piotr.wisniewski@mail.com', 28),
  ('Ewa Dąbrowska', 'ewa.dabrowska@mail.com', 35),
  ('Marek Lewandowski', 'marek.lewandowski@test.com', 42),
  ('Katarzyna Wójcik', 'katarzyna.wojcik@demo.com', 31),
  ('Tomasz Kamiński', 'tomasz.kaminski@example.com', 29),
  ('Magdalena Zielińska', 'magdalena.zielinska@mail.com', 36),
  ('Łukasz Szymański', 'lukasz.szymanski@test.com', 40),
  ('Aleksandra Woźniak', 'aleksandra.wozniak@demo.com', 27),
  ('Paweł Kowalczyk', 'pawel.kowalczyk@example.com', 33),
  ('Joanna Mazur', 'joanna.mazur@mail.com', 38),
  ('Kamil Kaczmarek', 'kamil.kaczmarek@test.com', 26),
  ('Agnieszka Piotrowska', 'agnieszka.piotrowska@demo.com', 37),
  ('Grzegorz Grabowski', 'grzegorz.grabowski@mail.com', 45),
  ('Zofia Pawlak', 'zofia.pawlak@example.com', 32),
  ('Robert Michalski', 'robert.michalski@test.com', 41),
  ('Natalia Nowicka', 'natalia.nowicka@demo.com', 34),
  ('Krzysztof Wróbel', 'krzysztof.wrobel@mail.com', 28),
  ('Sylwia Górska', 'sylwia.gorska@example.com', 39),
  ('Mariusz Czarnecki', 'mariusz.czarnecki@test.com', 44),
  ('Barbara Sokołowska', 'barbara.sokolowska@mail.com', 31),
  ('Adrian Król', 'adrian.krol@demo.com', 27),
  ('Emilia Witkowska', 'emilia.witkowska@example.com', 29),
  ('Patryk Jankowski', 'patryk.jankowski@mail.com', 36),
  ('Dominika Wysocka', 'dominika.wysocka@test.com', 42),
  ('Dawid Malinowski', 'dawid.malinowski@demo.com', 35),
  ('Karolina Tomczyk', 'karolina.tomczyk@example.com', 30),
  ('Mateusz Stępień', 'mateusz.stepien@mail.com', 33),
  ('Paulina Czerwińska', 'paulina.czerwinska@test.com', 31),
  ('Marcin Borkowski', 'marcin.borkowski@example.com', 28),
  ('Kamila Lis', 'kamila.lis@mail.com', 34),
  ('Konrad Włodarczyk', 'konrad.wlodarczyk@test.com', 37),
  ('Renata Ostrowska', 'renata.ostrowska@example.com', 39),
  ('Sebastian Gajewski', 'sebastian.gajewski@mail.com', 41),
  ('Monika Domańska', 'monika.domanska@test.com', 36),
  ('Damian Zawadzki', 'damian.zawadzki@example.com', 32),
  ('Joanna Szewczyk', 'joanna.szewczyk@mail.com', 29),
  ('Krzysztof Jastrzębski', 'krzysztof.jastrzebski@test.com', 30),
  ('Gabriela Janik', 'gabriela.janik@example.com', 38),
  ('Daniel Majewski', 'daniel.majewski@mail.com', 27),
  ('Justyna Żak', 'justyna.zak@test.com', 35),
  ('Bartosz Sikora', 'bartosz.sikora@example.com', 40),
  ('Natalia Wrona', 'natalia.wrona@mail.com', 33),
  ('Michał Kubicki', 'michal.kubicki@test.com', 42),
  ('Patrycja Wilk', 'patrycja.wilk@example.com', 31),
  ('Artur Kulesza', 'artur.kulesza@mail.com', 36),
  ('Iwona Czajka', 'iwona.czajka@test.com', 30),
  ('Szymon Olszewski', 'szymon.olszewski@example.com', 34),
  ('Dominik Nowacki', 'dominik.nowacki@mail.com', 28),
  ('Andrzej Kowalski', 'andrzejkowalski@mail.com', 34),
  ('Marcin Kowalski', 'marcinkowalski@mail.com', 33),
  ('Marcinek Kowalski', 'marcinekkowalski@mail.com', 33),
  ('Mataaaaeusz Kowalski', 'mataaaaaeuszkowalski@mail.com', 33),
  ('Andrzej Jankowski', 'andrzej.jankowski@mail.com', 36),
  ('Marek Jankowski', 'marekjankowski@mail.com', 38);
  `);

  await client.end();
  logger.info('Migration completed successfully.');
}

async function main() {
  try {
    await createDatabase();
  } catch (e: any) {
    if (!/already exists/.test(e.message)) {
      throw e;
    } else {
      logger.error('Database already exists, proceeding with migration...');
    }
  }
  await migrate();
}

main().catch(error => {
  logger.error('Error during migration:', error);
  console.error('Migration failed:', error);
});
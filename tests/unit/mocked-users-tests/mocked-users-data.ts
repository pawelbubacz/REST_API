const mockedUsers = [
  {
    id: 1,
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    age: 30,
  },
  {
    id: 2,
    name: 'Anna Nowak',
    email: 'anna.nowak@example.com',
    age: 25,
  },
  {
    id: 3,
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@mail.com',
    age: 28,
  },
  {
    id: 4,
    name: 'Ewa Dąbrowska',
    email: 'ewa.dabrowska@mail.com',
    age: 35,
  },
  {
    id: 5,
    name: 'Marek Lewandowski',
    email: 'marek.lewandowski@test.com',
    age: 42,
  },
  {
    id: 6,
    name: 'Katarzyna Wójcik',
    email: 'katarzyna.wojcik@demo.com',
    age: 31,
  },
  {
    id: 7,
    name: 'Tomasz Kamiński',
    email: 'tomasz.kaminski@example.com',
    age: 29,
  },
  {
    id: 8,
    name: 'Magdalena Zielińska',
    email: 'magdalena.zielinska@mail.com',
    age: 36,
  },
  {
    id: 9,
    name: 'Łukasz Szymański',
    email: 'lukasz.szymanski@test.com',
    age: 40,
  },
  {
    id: 10,
    name: 'Aleksandra Woźniak',
    email: 'aleksandra.wozniak@demo.com',
    age: 27,
  },
  {
    id: 11,
    name: 'Paweł Kowalczyk',
    email: 'pawel.kowalczyk@example.com',
    age: 33,
  },
  {
    id: 12,
    name: 'Joanna Mazur',
    email: 'joanna.mazur@mail.com',
    age: 38,
  },
  {
    id: 13,
    name: 'Kamil Kaczmarek',
    email: 'kamil.kaczmarek@test.com',
    age: 26,
  },
  {
    id: 14,
    name: 'Agnieszka Piotrowska',
    email: 'agnieszka.piotrowska@demo.com',
    age: 37,
  },
  {
    id: 15,
    name: 'Grzegorz Grabowski',
    email: 'grzegorz.grabowski@mail.com',
    age: 45,
  },
  {
    id: 16,
    name: 'Zofia Pawlak',
    email: 'zofia.pawlak@example.com',
    age: 32,
  },
  {
    id: 17,
    name: 'Robert Michalski',
    email: 'robert.michalski@test.com',
    age: 41,
  },
  {
    id: 18,
    name: 'Natalia Nowicka',
    email: 'natalia.nowicka@demo.com',
    age: 34,
  },
  {
    id: 19,
    name: 'Krzysztof Wróbel',
    email: 'krzysztof.wrobel@mail.com',
    age: 28,
  },
  {
    id: 20,
    name: 'Sylwia Górska',
    email: 'sylwia.gorska@example.com',
    age: 39,
  },
  {
    id: 21,
    name: 'Mariusz Czarnecki',
    email: 'mariusz.czarnecki@test.com',
    age: 44,
  },
  {
    id: 22,
    name: 'Barbara Sokołowska',
    email: 'barbara.sokolowska@mail.com',
    age: 31,
  },
  {
    id: 23,
    name: 'Adrian Król',
    email: 'adrian.krol@demo.com',
    age: 27,
  },
  {
    id: 24,
    name: 'Emilia Witkowska',
    email: 'emilia.witkowska@example.com',
    age: 29,
  },
  {
    id: 25,
    name: 'Patryk Jankowski',
    email: 'patryk.jankowski@mail.com',
    age: 36,
  },
  {
    id: 26,
    name: 'Dominika Wysocka',
    email: 'dominika.wysocka@test.com',
    age: 42,
  },
  {
    id: 27,
    name: 'Dawid Malinowski',
    email: 'dawid.malinowski@demo.com',
    age: 35,
  },
  {
    id: 28,
    name: 'Karolina Tomczyk',
    email: 'karolina.tomczyk@example.com',
    age: 30,
  },
  {
    id: 29,
    name: 'Mateusz Stępień',
    email: 'mateusz.stepien@mail.com',
    age: 33,
  },
  {
    id: 30,
    name: 'Paulina Czerwińska',
    email: 'paulina.czerwinska@test.com',
    age: 31,
  },
  {
    id: 31,
    name: 'Marcin Borkowski',
    email: 'marcin.borkowski@example.com',
    age: 28,
  },
  {
    id: 32,
    name: 'Kamila Lis',
    email: 'kamila.lis@mail.com',
    age: 34,
  },
  {
    id: 33,
    name: 'Konrad Włodarczyk',
    email: 'konrad.wlodarczyk@test.com',
    age: 37,
  },
  {
    id: 34,
    name: 'Renata Ostrowska',
    email: 'renata.ostrowska@example.com',
    age: 39,
  },
  {
    id: 35,
    name: 'Sebastian Gajewski',
    email: 'sebastian.gajewski@mail.com',
    age: 41,
  },
  {
    id: 36,
    name: 'Monika Domańska',
    email: 'monika.domanska@test.com',
    age: 36,
  },
  {
    id: 37,
    name: 'Damian Zawadzki',
    email: 'damian.zawadzki@example.com',
    age: 32,
  },
  {
    id: 38,
    name: 'Joanna Szewczyk',
    email: 'joanna.szewczyk@mail.com',
    age: 29,
  },
  {
    id: 39,
    name: 'Krzysztof Jastrzębski',
    email: 'krzysztof.jastrzebski@test.com',
    age: 30,
  },
  {
    id: 40,
    name: 'Gabriela Janik',
    email: 'gabriela.janik@example.com',
    age: 38,
  },
  {
    id: 41,
    name: 'Daniel Majewski',
    email: 'daniel.majewski@mail.com',
    age: 27,
  },
  {
    id: 42,
    name: 'Justyna Żak',
    email: 'justyna.zak@test.com',
    age: 35,
  },
  {
    id: 43,
    name: 'Bartosz Sikora',
    email: 'bartosz.sikora@example.com',
    age: 40,
  },
  {
    id: 44,
    name: 'Natalia Wrona',
    email: 'natalia.wrona@mail.com',
    age: 33,
  },
  {
    id: 45,
    name: 'Michał Kubicki',
    email: 'michal.kubicki@test.com',
    age: 42,
  },
  {
    id: 46,
    name: 'Patrycja Wilk',
    email: 'patrycja.wilk@example.com',
    age: 31,
  },
  {
    id: 47,
    name: 'Artur Kulesza',
    email: 'artur.kulesza@mail.com',
    age: 36,
  },
  {
    id: 48,
    name: 'Iwona Czajka',
    email: 'iwona.czajka@test.com',
    age: 30,
  },
  {
    id: 49,
    name: 'Szymon Olszewski',
    email: 'szymon.olszewski@example.com',
    age: 34,
  },
  {
    id: 50,
    name: 'Dominik Nowacki',
    email: 'dominik.nowacki@mail.com',
    age: 28,
  },
  {
    id: 51,
    name: 'Andrzej Kowalski',
    email: 'andrzejkowalski@mail.com',
    age: 34,
  },
  {
    id: 52,
    name: 'Marcin Kowalski',
    email: 'marcinkowalski@mail.com',
    age: 33,
  },
  {
    id: 53,
    name: 'Marcinek Kowalski',
    email: 'marcinekkowalski@mail.com',
    age: 33,
  },
  {
    id: 54,
    name: 'Mataaaaeusz Kowalski',
    email: 'mataaaaaeuszkowalski@mail.com',
    age: 33,
  },
  {
    id: 55,
    name: 'Bartek Kowalski',
    email: 'bartekkowalski@mail.com',
    age: 33,
  },
];

module.exports = mockedUsers;
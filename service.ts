import { users } from './users';

export function getAllUsers() {
  return users;
}

export function countUsers() {
  return users.length;
}

export function countWomen() {
  return users.filter(user => user.name.slice(-1) === 'a').length;
}

export function getUserById(id: number) {
  return users.find(user => user.id === id);
}

export function getUsersByEmailDomain(domain: string) {
  return users.filter(user => user.email.split('@')[1] === domain);
}

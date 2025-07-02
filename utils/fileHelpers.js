import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_PATH = path.join(__dirname, '../data/users.json');
const BOOKS_PATH = path.join(__dirname, '../data/books.json');

// function for reading users
export async function readUsers() {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

// function for writing users
export async function writeUsers(users) {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
}


// function for reading books
export async function readBooks() {
  try {
    const data = await fs.readFile(BOOKS_PATH, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

// function for writing books
export async function writeBooks(books) {
  await fs.writeFile(BOOKS_PATH, JSON.stringify(books, null, 2));
}
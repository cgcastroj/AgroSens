import * as SQLite from 'expo-sqlite';
import { User } from '../types/User';

const db = SQLite.openDatabaseSync('agrosens.db');

export const dbService = {
  // Inicialización (Ejecutar en App.js)
  setupDatabase: () => {
    db.execSync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
  },

  // Lógica de Usuario
  createUser: (user: User) => {
    return db.runSync(
      'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
      [user.firstName, user.lastName, user.email, user.password!]
    );
  },

  getUserByEmail: (email: string): User | null => {
    return db.getFirstSync('SELECT * FROM users WHERE email = ?', [email]);
  }
};
import argon2 from "@node-rs/argon2";
import pg from "pg";
import { crc32 } from "@node-rs/crc32";

export class PostgresUserDao {
  // singeltons - do not use! Inject database (as function parameter), to be able to use use any database.
  constructor(db) {
    this.db = db;
  }

  close() {
    this.db.end();
  }

  #rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId]
    );
    return rows.map(this.#rowToUser)[0] || null;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash]
    );
  }
}

export class PasswordService {
  // pass users and hasher as function parameters, to be able to use mock versions, not using the real db.
  constructor(users, hasher){
    this.users = users;
    this.hasher = hasher;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!this.hasher.verifyPassword(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = this.hasher.hashPassword(newPassword);
    await this.users.save(user);
  }
}

export class TestUserDao {
  // fake in memory db for testing
  users = {};
  async getById(id) {
    return structuredClone(this.users[id]) || null;
  }
  async save(user) {
    this.users[user.userId] = user;
  }
}

export class FakeHasher {
  // Hashign logic as in reference solution.
  intToHex(n) {
    return (n >>> 0).toString(16).padStart(8, "0");
  }
  hashPassword(password) {
    return this.intToHex(crc32(password));
  }
  verifyPassword(hash, password) {
    return this.hashPassword(password) === hash;
  }
}
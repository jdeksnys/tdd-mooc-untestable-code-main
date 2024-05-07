import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao, TestUserDao } from "../src/testable4.mjs";
import argon2 from "@node-rs/argon2";

describe("Globals and singletons: enterprise application", () => {
  let users;
  let hasher;
  let service;

  beforeEach(() => {
    users = new TestUserDao();
    hasher = argon2;
    service = new PasswordService(users, hasher);
  });

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });
});

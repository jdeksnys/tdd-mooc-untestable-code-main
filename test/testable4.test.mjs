import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao, TestUserDao } from "../src/testable4.mjs";

describe("Globals and singletons: enterprise application", () => {
  let users;
  let hasher;
  let service;

  beforeEach(() => {
    users = new TestUserDao();
    service = new PasswordService(users, hasher);
  });

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });
});

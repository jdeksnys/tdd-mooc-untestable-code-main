import { afterEach, beforeEach, describe, test } from "vitest";
import { FakeHasher, PasswordService, PostgresUserDao, TestUserDao } from "../src/testable4.mjs";
import { expect } from "chai";


describe("Globals and singletons: enterprise application", () => {
  let users;
  let hasher;
  let service;
  let userId = 999;

  beforeEach(() => {
    users = new TestUserDao();
    hasher = new FakeHasher();
    service = new PasswordService(users, hasher);
  });

  test("change the password, check hashes", async () => {
    const user0 = {
      userId,
      passwordHash: hasher.hashPassword("pass0")
    };
    await users.save(user0);

    await service.changePassword(userId, "pass0", "pass1");
    const user1 = await users.getById(userId);

    expect(user1.passwordHash).to.not.equal(user0.passwordHash);

    expect(hasher.verifyPassword(user1.passwordHash, "pass1")).to.be.true;
  });
});

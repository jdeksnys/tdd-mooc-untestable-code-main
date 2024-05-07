import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("0 until xmas", () => {
    let date0 = new Date("2022-12-25T00:00:00");

    expect(daysUntilChristmas(date0)).to.equal(0);
  });
});

import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("0 until xmas", () => {
    let date0 = new Date("2024-12-25T00:00:00");
    let date1 = new Date("2024-12-25T23:59:59");
    let date2 = new Date("2024-12-25T12:00:00");

    expect(daysUntilChristmas(date0)).to.equal(0);
    expect(daysUntilChristmas(date1)).to.equal(0);
    expect(daysUntilChristmas(date2)).to.equal(0);
  });

});

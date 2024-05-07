import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("diceRoll(): min=1; max=6;", () => {
    let set = new Set();

    for(let i=0; i<1000; i++){
      set.add(diceRoll());
    }

    let min_ = Math.min(...set);
    let max_ = Math.max(...set);

    expect(min_).to.equal(1);
    expect(max_).to.equal(6);
  });

  test("diceRoll(): all 6 values returned", () => {
    let set = new Set();
    for(let i=0; i<1000; i++){
      set.add(diceRoll());
    }

    expect(set.size).to.equal(6);
    expect(set.has(1)).to.equal(true);
    expect(set.has(2)).to.equal(true);
    expect(set.has(3)).to.equal(true);
    expect(set.has(4)).to.equal(true);
    expect(set.has(5)).to.equal(true);
    expect(set.has(6)).to.equal(true);
  });

  test("diceHandValue(): pair detected", () => {
    for(let i=1; i<=6; i++){
      expect(diceHandValue(i,i)).to.equal(100+i);
    }
  });

  test("diceHandValue(): higher detected", () => {
    for(let i=2; i<=6; i++){
      expect(diceHandValue(i,1)).to.equal(i);
      expect(diceHandValue(1,i)).to.equal(i);
    }
  });
});

import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, readFile } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("readFile() reads ok", async () => {
    expect(await readFile("./test/dummy_file.txt")).to.equal("abc123\n");
  });
});

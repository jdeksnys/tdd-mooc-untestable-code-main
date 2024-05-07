import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

export async function readFile(filePath){
  let res = await readFile(filePath, { encoding: "utf8" });
  return await res;
}

export function parsePeopleCsv(csvData) {
  //need actual test file on machine to run test. Just pass csvData as function parameter.
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });

  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}

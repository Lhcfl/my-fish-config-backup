#! /home/lhc_fl/.bun/bin/bun
import fs from "fs";

const NOTICE = `
# Automatically generated completions by update-completions.ts
# Do not edit manually!
# To update, run \`bun update-completions.ts\`

`.trimStart();

const generators = fs.readdirSync("./completions-generators");

const runners = await Promise.all(
  generators.map(async (file) => [
    await import(`./completions-generators/${file}`),
    file,
  ])
);

const jobs = runners.map(async ([runner, name]) => {
  console.log(`[generator] Running generator ${name}`);
  const text = await runner.default();
  console.log(`[generator] Finished generator ${name}`);
  return new Promise((res, rej) => fs.writeFile(`./generated-completions/${name.replace(/\.ts$/, ".fish")}`, `${NOTICE}\n${text}`, (err) => {
    if (err) rej(err);
    else {
      console.log(`[generator] Wrote file for ${name}`);
      res(null);
    }
  }));
});

const res = await Promise.allSettled(jobs);

const errors = res.filter(x => x.status === "rejected");

if (errors.length > 0) {
  console.error(`${errors.length} generators failed:`);
  for (const err of errors) {
    console.error(err);
  }
} else {
  console.log("All generators completed successfully.");
}
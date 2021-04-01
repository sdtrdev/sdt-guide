#! /usr/bin/env node

const fetch = require("node-fetch");
const arg = require("arg");
const chalk = require("chalk");

let args;
try {
  args = arg({
    "--list-crew": Boolean,
    "--list-special-programmers": Boolean,
    "--list-special-designers": Boolean,
  });
} catch (error) {
  console.log("Unknow option");
}

fetch("https://github.com/sdtrdev/sdtr-guide/blob/master/info.json")
  .then((data) => data.json())
  .then((data) => {
    if (args["--list-crew"]) {
      data.moderation.forEach((mod) => {
        console.log(
          `${
            mod.type === "owner"
              ? chalk.redBright("Owner")
              : chalk.greenBright("Moderator")
          } - ${mod.name}`
        );
      });
      console.log();
    }
    if (args["--list-special-programmers"]) {
      data.spacialmembers
        .filter((m) => m.type === "programmer")
        .forEach((d) => {
          console.log(d.name);
        });
      console.log();
    }
    if (args["--list-special-designers"]) {
      data.spacialmembers
        .filter((m) => m.type === "designer")
        .forEach((d) => {
          console.log(d.name);
        });
      console.log();
    }
    console.log(`💜 Join us: ${chalk.underline(data.dclink)}`);
  })
  .catch(console.error);

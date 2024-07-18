#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { runCreateProject } from "../src/commands/create-project.js";

const examples = {
  "Create Project": runCreateProject
};

console.log(
  chalk.blueBright(figlet.textSync("Node CLI", { horizontalLayout: "full" }))
);

inquirer
.prompt([
  {
    type: "list",
    name: "choice",
    message: "Choose an option:",
    choices: Object.keys(examples),
  },
])
.then((result) => {
  const exampleFunction = examples[result.choice];
  if (exampleFunction) {
    exampleFunction();
  } else {
    console.error("Invalid selection");
  }
});
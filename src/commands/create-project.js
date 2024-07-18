import chalk from "chalk";
import path from "path";
import inquirer from "inquirer";
import simpleGit from "simple-git";
import ora from "ora";

const git = simpleGit();

const templates = {
  "Node-js Boilerplate": "https://github.com/edwinmghdez/node-js-boilerplate"
};

export const runCreateProject = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Choose a project type:",
      choices: Object.keys(templates),
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter the name of your new project:",
      validate: input => input !== "" ? true : "Project name cannot be empty",
    },
  ]);

  const { template, projectName } = answers;
  const repoUrl = templates[template];
  const projectPath = path.join(process.cwd(), projectName);

  try {
    const spinner = ora(`Creating project...`).start();
    const resp = await git.clone(repoUrl, projectPath);

    setTimeout(() => {
      spinner.succeed(chalk.green(`Project ${projectName} created successfully!`));
    }, resp);
  } catch (error) {
    console.error(chalk.red(`Error creating project: ${error.message}`));
  }
};

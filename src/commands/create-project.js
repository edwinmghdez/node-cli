import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from 'url';

export const runCreateProject = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatesDir = path.resolve(__dirname, "../../templates");

  const templates = fs.readdirSync(templatesDir).filter(file => 
    fs.statSync(path.join(templatesDir, file)).isDirectory()
  );

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Choose a project template:",
      choices: templates,
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter the name of your new project:",
      validate: input => input !== "" ? true : "Project name cannot be empty",
    },
  ]);

  const { template, projectName } = answers;
  const templatePath = path.join(templatesDir, template);
  const projectPath = path.join(process.cwd(), projectName);

  try {
    fs.copySync(templatePath, projectPath);
    console.log(chalk.green(`Project ${projectName} created successfully!`));
  } catch (error) {
    console.error(chalk.red(`Error creating project: ${error.message}`));
  }
};

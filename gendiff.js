#!/usr/bin/env node
import { program } from 'commander';


program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .argument('<filepath1>', 'path to first config file')
  .argument('<filepath2>', 'path to second config file')
  .option('-f, --format <type>', 'output format', 'plain') // Добавьте значение по умолчанию, если нужно
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, options) => {
    const diffFunction = getDiffFunction(filepath1, filepath2);
    const diff = diffFunction(filepath1, filepath2);
    const format = getFormatter(options.format || 'plain'); // Получаем функцию форматирования с учетом аргумента format
    console.log(format(diff));
  });

program.parse(process.argv);

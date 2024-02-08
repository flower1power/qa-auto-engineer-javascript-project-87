import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseJSON = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  try {
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Ошибка при чтении или разборе JSON файла '${filePath}':`, error);
    return {}; // Возвращаем пустой объект в случае ошибки
  }
};

const parseYAML = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  try {
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return yaml.load(fileContent) || {}; // Используем load для разбора YAML. Возвращаем пустой объект, если результат null
  } catch (error) {
    console.error(`Ошибка при чтении или разборе YAML файла '${filePath}':`, error);
    return {}; // Возвращаем пустой объект в случае ошибки
  }
};

export { parseJSON, parseYAML };

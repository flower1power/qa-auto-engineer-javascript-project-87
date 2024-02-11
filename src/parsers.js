import yaml from 'js-yaml';

export default (format) => {
  switch (format) {
    case 'json': return JSON.parse;
    case 'yaml': return yaml.load;
    default: return 'Нет такого фармата'
  }
}
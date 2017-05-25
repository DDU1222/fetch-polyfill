import fs from 'fs';
import path from 'path';


export function getEntries(folder, isHMR) {
  let entries = {};
  let filePath = `${process.cwd()}/src/${folder}`;
  let files = fs.readdirSync(filePath);
  for (let file of files) {
    let fullname = `${filePath}/${file}`;
    if (fs.statSync(fullname).isFile() && !file.startsWith('.')) {
      console.log(file + ' is: ' + 'file');
      let fileName = file.split('.')[0];
      if (isHMR) {
          entries[fileName] = ['webpack-hot-middleware/client', `${filePath}/${file}`];
      } else {
          entries[fileName] = `${filePath}/${file}`;
      }
    }
  }
  console.log('entries', entries)
  return entries;
}

export function getRouter() {
  let routers = [];
  let text = fs.readFileSync('./router.js', 'utf8');
  let rountJson = JSON.parse(text);
  for (let key in rountJson) {
    routers.push({path: key, pointer: rountJson[key]});
  }
  console.log('routers', routers);
  return routers;
}
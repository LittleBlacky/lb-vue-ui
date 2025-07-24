import fs from 'fs'
import path from 'path'

//

export function createCatalog(root: string = '/src/components/basic') {
  const rootPath = path.join(__dirname, '../', root);
  console.log(rootPath)
  const files = fs.readdirSync(rootPath);
  console.log(files);
  return [];
}

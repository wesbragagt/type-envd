#! /usr/bin/env node
import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'path'
//@ts-ignore
import recursive from "recursive-readdir";

const targetOutputDefinition = process.argv[2] || 'src/env.generated.d.ts';

const gatherAllEnvFiles = async () => {
  const files = await recursive(process.cwd(), ['node_modules'])
  if (files.length > 0) {
    const envFiles = files.filter((file: string) => file.match(/.*(\.env|\.env\.\w*)$/));
    console.log("Files read", JSON.stringify(envFiles, undefined, 2))
    return envFiles;
  } else {
    console.log("No env files to generate types")
    process.exit(0)
  }
}

const mapEnvContent = (env: string) => {
  const extractKeys = (line: string) => line.match(/^[A-Z_]*=/) ? line.split('=')[0] : '';

  return env.split('\n').map(extractKeys).filter(Boolean)
}

const generateTypesFromKeys = (keys: string[]) => {
  const mapKeysToUnion = (keys: string[]) => keys.map(key => `"${key}"`).join('|');
  return `export type EnvKeys = ${mapKeysToUnion(keys)}; 
export type Envs = { [K in EnvKeys]?: string };`
}

const outputTypes = (content: string) => {
  const filePath = path.join(process.cwd(), targetOutputDefinition)
  fs.writeFileSync(filePath, content);
  console.log(`Wrote environment definitions to ${filePath}`)

  return content;
}

async function main() {
  const fileList = await gatherAllEnvFiles();
  const filesContentKeys: string[] = await Promise.all(
    fileList.map((envFile: string) => {
      return fsPromise.readFile(envFile, 'utf8').then(mapEnvContent)
    })
  );


  const uniqueFilesContent = [...new Set(filesContentKeys.flat(2))];
  const types = generateTypesFromKeys(uniqueFilesContent);
  outputTypes(types);
}

main();

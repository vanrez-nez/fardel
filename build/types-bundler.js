/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { getPackages } = require('@lerna/project');
const {
    CompilerState,
    Extractor,
    ExtractorConfig,
} = require('@microsoft/api-extractor');

const PROJECT_FOLDER = process.cwd();
const TSCONFIG_PATH = path.join(PROJECT_FOLDER, "./tsconfig.json");

/**
 * Get contents from tsconfig.json
 */
async function getTsConfig() {
  if (!fs.existsSync(TSCONFIG_PATH)) {
    throw new Error(`${TSCONFIG_PATH} does not exists.`);
  }
  return require(path.relative(__dirname, TSCONFIG_PATH));
}

/**
 * Get each package json from mono repo and append location
 */
async function getRepoPackages() {
  const projectPackages = await getPackages(PROJECT_FOLDER);
  return projectPackages.map(pkg => {
    return {
      ...pkg.toJSON(),
      location: pkg.location,
    }
  });
}

function getPackageExtractorConfig(pkg, entryPoint) {
  return ExtractorConfig.prepare({
    configObject: {
      mainEntryPointFilePath: entryPoint,
      projectFolder: pkg.location,
      compiler: {
        tsconfigFilePath: TSCONFIG_PATH
      },
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: path.join(pkg.location, 'index.d.ts')
      },
      messages: {

      }
    },
    packageJson: pkg,
    packageFolder: pkg.location,
    packageJsonFullPath: path.join(pkg.location, './package.json')
  });
}

async function extract() {
  const tsConfig = await getTsConfig();
  const packages = await getRepoPackages();
  const outDir = path.join(PROJECT_FOLDER, tsConfig.compilerOptions.outDir);
  // Process packages
  let compilerState;
  packages.forEach(pkg => {
    const relative = path.relative(PROJECT_FOLDER, pkg.location);
    const dstFolder = path.join(outDir, relative.replace('packages', ''));
    const entryPoint = path.join(dstFolder, './src/index.d.ts');
    const extractorConfig = getPackageExtractorConfig(pkg, entryPoint);
    compilerState = compilerState || CompilerState.create(extractorConfig);
    let result = {
      succeeded: false
    };
    try {
      result = Extractor.invoke(extractorConfig, {
        showVerboseMessages: true,
      }, compilerState)
    } catch (e) {
      console.log(`${pkg.name} failed`);
      console.error(e);
      process.exit(1);
    }
    if (!result.succeeded) {
      if (result.errorCount > 0) {
        console.error(`${pkg.name}: completed with ${result.errorCount} errors.`);
      }
      if (result.warningCount > 0) {
        console.error(`${pkg.name}: completed with ${result.warningCount} warnings.`);
      }
    }
  });
}

extract();
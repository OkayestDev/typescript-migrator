const path = require("path");
const fs = require("fs");

const toTypescript = (filepath) => {
  fs.renameSync(filepath, filepath.replace(".js", ".ts"));
};

const recursiveDirectoryWalk = async (directory, callback) => {
  const files = fs.readdirSync(directory);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const dir = path.join(directory, file);
    const stat = fs.lstatSync(dir);
    if (stat.isDirectory()) {
      recursiveDirectoryWalk(dir, callback);
    } else {
      await callback(dir);
    }
  }
};

const fileCallback = async (filepath) => {
  console.info({ filepath });
  const isJavaScriptFile = filepath.endsWith(".js");
  if (isJavaScriptFile) {
    toTypescript(filepath);
  }
};

const migrateToTypescript = (path) => {
  recursiveDirectoryWalk(path, fileCallback);
};

module.exports = {
  migrateToTypescript,
};

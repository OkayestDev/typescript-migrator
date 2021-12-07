const { migrateToTypescript } = require("./create-ts-files");

const args = process.argv.slice(2);

migrateToTypescript(args[0]);

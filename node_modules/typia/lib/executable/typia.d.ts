#!/usr/bin/env node
declare const USAGE = "Wrong command has been detected. Use like below:\n\n  npx typia setup \\\n    --manager (npm|pnpm|yarn) \\\n    --project {tsconfig.json file path}\n\n    - npx typia setup\n    - npx typia setup --manager pnpm\n    - npx typia setup --project tsconfig.test.json\n\n  npx typia generate \n    --input {directory} \\\n    --output {directory}\n\n    --npx typia generate --input src/templates --output src/functinoal\n";
declare const halt: (desc: string) => never;
declare const main: () => Promise<void>;

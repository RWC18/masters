/**
 * @babel/runtime sometimes ends up partially extracted (only a few helper
 * files). MUI then fails with "Can't resolve @babel/runtime/helpers/...".
 * This script reinstalls the pinned runtime if sentinel files are missing.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const RUNTIME = path.join(ROOT, 'node_modules', '@babel/runtime');
const PINNED = '7.26.10';

if (process.env.SKIP_BABEL_RUNTIME_POSTINSTALL === '1') {
  process.exit(0);
}

function runtimeLooksComplete() {
  const sentinels = [
    path.join(RUNTIME, 'helpers', 'interopRequireDefault.js'),
    path.join(RUNTIME, 'helpers', 'objectWithoutPropertiesLoose.js'),
    path.join(RUNTIME, 'helpers', 'esm', 'objectWithoutPropertiesLoose.js'),
    path.join(RUNTIME, 'helpers', 'esm', 'assertThisInitialized.js'),
  ];
  return sentinels.every((p) => fs.existsSync(p));
}

if (!fs.existsSync(RUNTIME)) {
  process.exit(0);
}

if (runtimeLooksComplete()) {
  process.exit(0);
}

console.warn(
  '[ensure-babel-runtime] incomplete @babel/runtime; reinstalling',
  PINNED,
);
execSync(`npm install @babel/runtime@${PINNED} --no-audit --no-fund`, {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, SKIP_BABEL_RUNTIME_POSTINSTALL: '1' },
});

if (!runtimeLooksComplete()) {
  console.error('[ensure-babel-runtime] repair did not restore all helpers.');
  process.exit(1);
}

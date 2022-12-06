#!/usr/bin/env node
/* eslint no-console: 0 */
'use strict';

import fs from 'fs';
import sade from 'sade';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prog = sade('volto');

const packageJSON = JSON.parse(
  fs.readFileSync(`${__dirname}/../package.json`, 'utf8'),
);
prog.version(packageJSON.version);

const argv = process.argv.slice(3);

prog
  .command('build')
  .describe('Build the application')
  .option(
    '-t, --type',
    'Change the application build type. Must be either `iso` or `spa`.',
    'iso',
  )
  .action(() => {
    runSimpleCommand('build', [], argv);
  });

prog
  .command('start')
  .describe('Start the application in development mode.')
  .option(
    '-t, --type',
    'Change the application build type. Must be either `iso` or `spa`.',
    'iso',
  )
  .action(() => {
    runSimpleCommand('start', [], argv);
  });

prog
  .command('serve')
  .describe('Serve the application in production mode.')
  .option(
    '-t, --type',
    'Change the application build type. Must be either `iso` or `spa`.',
    'iso',
  )
  .action(() => {
    runSimpleCommand('start', [], argv);
  });

prog
  .command('test')
  .describe('Runs the test watcher in an interactive mode.')
  .action(() => {
    runCommand(
      'test',
      argv.filter((x) => x.includes('--inspect')),
      argv.filter((x) => !x.includes('--inspect')),
    );
  });

function runSimpleCommand(script, node_args, script_args) {
  let args, options;
  switch (script) {
    case 'start':
      args = [`${__dirname}/../src/server.js`];
      break;
    case 'build':
      args = [`${__dirname}/../src/server.js`];
      break;
    case 'serve':
      args = [`${__dirname}/../src/server.js`];
      options = { env: { NODE_ENV: 'production' } };
      break;
    default:
      break;
  }

  const result = spawnSync('node', args, {
    stdio: 'inherit',
    ...(options || {}),
  });

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.',
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.',
      );
    }
    process.exit(1);
  }
  process.exit(result.status);
}

function runCommand(script, node_args, script_args) {
  const result = spawnSync.sync(
    'node',
    node_args
      .concat([require.resolve('../scripts/' + script)])
      .concat(script_args),
    { stdio: 'inherit' },
  );
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.',
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.',
      );
    }
    process.exit(1);
  }
  process.exit(result.status);
}

prog.parse(process.argv);

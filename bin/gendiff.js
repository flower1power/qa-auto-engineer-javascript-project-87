#!/usr/bin/env node
import { Command, program } from 'commander';

const { commander } = commander;
const program = new Command();

program.version('0.0.1', '-V, --version', 'output the version number');

program.helpOption('-h, --help', 'display help for command');

program.parse();

#!/usr/bin/env node

const path = require('path');

const gitloop = require("./index.js");

const argvs = process.argv;
const GITLOOPINDEX = 2;
const _onlyIndexOf = (argvs.indexOf('-o') || argvs.indexOf('--only'));
const _only = _onlyIndexOf===-1?false:true;
const folder = argvs[_only?GITLOOPINDEX+1:GITLOOPINDEX];
const _command = _only ? argvs.slice(GITLOOPINDEX) : argvs.slice(GITLOOPINDEX+1);

const resolveFolderUrl = path.resolve('./', folder);

gitloop(resolveFolderUrl, {_only, _command: _command.join(" ")});
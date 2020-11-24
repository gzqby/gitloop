#!/usr/bin/env node

const path = require('path');

const gitloop = require("./index.js");

const argvs = process.argv;
const GITLOOPINDEX = process.argv0 === "gitloop" ? 1 : 2;
const _onlyIndexOf = (argvs.indexOf('-o') || argvs.indexOf('--only'));
const _only = _onlyIndexOf===-1?false:true;
const folder = argvs[_only?_only+1:GITLOOPINDEX];
const _command = _only ? argvs.slice(_onlyIndexOf) : argvs.slice(GITLOOPINDEX+1);

const resolveFolderUrl = path.resolve(__dirname, folder);

gitloop(resolveFolderUrl, {_only, _command: _command.join(" ")});
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');

function gitloop(resolveFolderUrl, {_only, _command}) {
  if (!_command) {
    console.error(`There is not any command!`);
    return;
  }
  
  let fileOrFolder;
  try {
    fileOrFolder = fs.readdirSync(resolveFolderUrl)
  } catch (error) {
    throw new Error(error);
  }

  if(!_only) {
    fileOrFolder.forEach(file=>{
      const url = path.resolve(resolveFolderUrl, file);
      let isGit,err;
      try{
        isGit = isDotGit(url, file);
      } catch (error) {
        err = `project ${file}: not a directory`;
        console.error(err)
      }
      if(!err){
        if (isGit) {
          // cd url && git something
          gitCommand(url, _command)
          .then((stdout)=>{
            console.log(`project ${file} stdout: ${parseErr(stdout, true) || "no stdout and completed!"}`);
          }, (err)=>{
            if(err) console.error(`project ${file}: %s`, parseErr(err));
          });
        }else {
          console.log(`project ${file}: .git not exist!`);
        }
      }
    });
  }else{
    console.error(`please use shell: cd ${resolveFolderUrl} && git ${_command}`);
  }
  cdOrigin(__dirname);
}

function parseErr(err, flag) {
  const errStr = err.toString()
  if(flag) {
    const stdoutFilterArr = /(.+)\n$/.exec(errStr);
    return stdoutFilterArr && stdoutFilterArr.length>=1 ? stdoutFilterArr[1] : errStr;
  }
  const errParse = /(Command failed: ).+&& git (.+)\n$/.exec(errStr);
  return errParse && errParse.length >2 ? errParse[1]+errParse[2]  : errStr;
}

function gitCommand(url, params) {
  return new Promise((resovle, reject)=>{
    exec(`cd ${url} && git ${params}`, (err, stdout)=>{
      if(err) reject(err);
      resovle(stdout);
    });
  })
}

function cdOrigin(params) {
  const cd = spawn('cd', [params]);
  return cd;
}

function isDotGit(url) {
  files = fs.readdirSync(url);
  return files.includes('.git');
}

module.exports = gitloop;
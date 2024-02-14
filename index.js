const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");

/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

// const nodeVersion = semver.parse(process.version);
// if (nodeVersion.major < 13) {
//     logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
//     return process.exit(0);
// };

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

/*const dashboard = http.createServer(function (_req, res) {
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.write("HI! THIS BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯");
    res.end();
});

dashboard.listen(process.env.port || 0);*/
const express = require('express');
const app = express();

const port = process.env.PORT || 5000
// const port = 5000

app.listen(port, () =>
  logger(`Your app is listening a http://localhost:${port}`, "[ ONLINE ]")
     );      


logger("Opened server site...", "[ Starting ]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ Starting ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "Garfield.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

  /*child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("Restarting...");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Open ...");
       }
         else return; 
    });*/
  child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("Starting up...");
            global.countRestart += 1;
            return;
        } else return;
    });

  child.on("error", function(error) {
    logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
  });
};
////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////


axios.get("https://github.com/garfieldwu1").then((res) => {
  //logger(res['data']['name'], "[ NAME ]");
  //logger("Version: " + res['data']['version'], "[ VERSION ]");
  //logger(res['data']['description'], "[ DESCRIPTION ]");
});
startBot();
/*axios.get("https://raw.githubusercontent.com/Shiron-Official/miraiv2/main/package.json").then((res) => {
    const local = JSON.parse(readFileSync('./package.json'));
    if (semver['lt'](local.version, res['data']['version'])) {
        if (local.autoUpdate == !![]) {
            logger('A new update is available, start update processing...', '[ UPDATE ]');
            const updateBot = {};
            updateBot.cwd = __dirname
            updateBot.stdio = 'inherit'
            updateBot.shell = !![];
            const child = spawn('node', ['update.js'], updateBot);
            child.on('exit', function () {
                return process.exit(0);
            })
            child.on('error', function (error) {
                logger('Unable to update:' + JSON.stringify(error), '[ CHECK UPDATE ]');
            });
        } else logger('A new update is available! Open terminal/cmd and type "node update" to update!', '[ UPDATE ]'),
        startBot();
    } else logger('You are using the latest version!', '[ CHECK UPDATE ]'), startBot();
}).catch(err => logger("Unable to check update.", "[ CHECK UPDATE ]"));*/
// THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
app.get('/', (req, res) => //res.send('YAHALLO!!'));
res.sendFile(__dirname+'/index.html'))
//hatdoggggg

const fs = require('fs');
const os = require('os');
const chokidar = require('chokidar');

function getFormattedDate() {
  const date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

function logUptime() {
  const uptime = process.uptime();
  const formattedDate = getFormattedDate();
  const data = `${formattedDate} - Uptime: ${uptime.toFixed(2)} seconds\n`;

  fs.appendFile('uptime.json', data, (err) => {
    if (err) throw err;
    console.log('Uptime logged.');

    const uptimeLimit = 24 * 60 * 60; // 24 hours in seconds
    if (uptime >= uptimeLimit) {
      console.log('24 hours uptime reached. Stopping logging.');
      clearInterval(intervalId); // Stop the interval when 24 hours are reached
    }
  });
}

const intervalId = setInterval(logUptime, 300000); // Log uptime every 5 minutes (300,000 milliseconds)

// Using os module to get platform information
console.log('Operating System Platform:', os.platform());
console.log('Operating System CPU Architecture:', os.arch());

// Using chokidar module for file watching
const watcher = chokidar.watch('targetDir', { persistent: true });

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
});

watcher.on('error', (error) => {
  console.error(`Watcher encountered an error: ${error}`);
});

function getUptime() {
  const uptime = os.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

function monitorUptime() {
  setInterval(() => {
    const uptime = getUptime();
    console.log(`System uptime: ${uptime}`);
  }, 5000); // Change the interval (in milliseconds) as needed
}

monitorUptime();

function runLoop() {
  console.log("Executing the loop");
}

function startLoop() {
  runLoop();
  setTimeout(startLoop, 24 * 60 * 60 * 1000);
}

startLoop();

function getUptime() {
    const uptime = os.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

function monitorUptime() {
    const totalMilliseconds = 120 * 60 * 60 * 1000; // 120 hours in milliseconds
    let elapsedTime = 0;

    const interval = setInterval(() => {
        const uptime = getUptime();
        console.log(`System uptime: ${uptime}`);

        elapsedTime += 5000; // Interval is every 5000 milliseconds
        if (elapsedTime >= totalMilliseconds) {
            clearInterval(interval); // Stop when reaching 120 hours
        }
    }, 5000);
}

monitorUptime();

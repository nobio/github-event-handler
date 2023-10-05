const { GITHUB_WEBHOOK_TRIGGER_CMD, GITHUB_WEBHOOK_TRIGGER_CMD_ARGS } = process.env;
const { spawn } = require("child_process");

//console.log(GITHUB_WEBHOOK_TRIGGER_CMD);
//console.log(GITHUB_WEBHOOK_TRIGGER_CMD_ARGS);
//console.log(GITHUB_WEBHOOK_TRIGGER_CMD_ARGS.split(' '));

exports.execCmd = (command, args) => {
   console.log(' execut command\n  ' + command, args);
   let cmd;

   if (!args) {
      cmd = spawn(command);
   } else {
      cmd = spawn(command, args);
   }

   cmd.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
   });

   cmd.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
   });

   cmd.on('error', (error) => {
      console.log(`error: ${error.message}`);
   });

   cmd.on("close", code => {
      console.log(`child process exited with code ${code}`);
   });

};

exports.experiment = (req, res) => {
   console.log(' execut command\n  ' + GITHUB_WEBHOOK_TRIGGER_CMD, GITHUB_WEBHOOK_TRIGGER_CMD_ARGS);

   const cmd = spawn(GITHUB_WEBHOOK_TRIGGER_CMD, GITHUB_WEBHOOK_TRIGGER_CMD_ARGS.split(' '));

   cmd.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
   });

   cmd.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
   });

   cmd.on('error', (error) => {
      console.log(`error: ${error.message}`);
   });

   cmd.on("close", code => {
      console.log(`child process exited with code ${code}`);
   });


   res.status(200).send();
};

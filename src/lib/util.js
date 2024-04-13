const { spawn } = require("child_process");
exports.execCmd = (command, args) => new Promise((resolve, reject) => {
   // prepare the command
   let cmd;

   if (!args) {
      console.log(' execute command\n   "' + command);
      cmd = spawn(command);
   } else {
      console.log(' execute command\n   "' + command + '" with arguemts: "' + args + '"');
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
      reject(error.message);
   });

   cmd.on("close", code => {
      console.log(`child process exited with code ${code}`);
      resolve(code);
   });
});
exports.execCmdOld = async (command, args) => {
   // prepare the command
   let cmd;

   if (!args) {
      console.log(' execute command\n   "' + command);
      cmd = spawn(command);
   } else {
      console.log(' execute command\n   "' + command + '" with arguemts: "' + args + '"');
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
   res.status(200).send('');
};

const {
   GITHUB_WEBHOOK_TRIGGER_NAME,
   GITHUB_WEBHOOK_TRIGGER_ACTION,
   GITHUB_WEBHOOK_TRIGGER_CMD,
   GITHUB_WEBHOOK_TRIGGER_CMD_ARGS,
} = process.env;

const util = require('./util');

console.log(`Trigger condition: "${GITHUB_WEBHOOK_TRIGGER_NAME} ${GITHUB_WEBHOOK_TRIGGER_ACTION}"`);

/**
 * Callback for webhook
 * @param {*} req Request Object (to be parsed)
 * @param {*} res Response Object (status to be set)
 */
exports.webhook = (req, res) => {
   if (req.body.check_run) {
      if (req.body.check_run.name == GITHUB_WEBHOOK_TRIGGER_NAME && req.body.action == GITHUB_WEBHOOK_TRIGGER_ACTION) {
         // this is the right time to do something
         console.log('TRIGGERED!!! ' + GITHUB_WEBHOOK_TRIGGER_NAME + " " + GITHUB_WEBHOOK_TRIGGER_ACTION);
         /*
         if (!GITHUB_WEBHOOK_TRIGGER_CMD_ARGS)
            util.execCmd(req.body.repository.name, GITHUB_WEBHOOK_TRIGGER_CMD);
         else
            util.execCmd(req.body.repository.name, GITHUB_WEBHOOK_TRIGGER_CMD, GITHUB_WEBHOOK_TRIGGER_CMD_ARGS.split(' '));
         */
         // no command from "outside"
         util.execCmd('touch', ['./etc/deploy.' + req.body.repository.name]);

      } else {
         console.log(`ignoring ${JSON.stringify(req.body.check_run.name)}  ${req.body.action} (${req.body.repository.name})`);
      }
   }
   res.status(200).send();
};

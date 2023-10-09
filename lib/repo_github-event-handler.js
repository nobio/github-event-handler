const {
   GITHUB_WEBHOOK_TRIGGER_NAME,
   GITHUB_WEBHOOK_TRIGGER_ACTION,
   GITHUB_WEBHOOK_TRIGGER_CMD,
   GITHUB_WEBHOOK_TRIGGER_CMD_ARGS,
   GITHUB_WEBHOOK_TRIGGER
} = process.env;

const util = require('./util');
const triggerConditions = GITHUB_WEBHOOK_TRIGGER.split(', ');

//console.log(`Trigger condition: "${GITHUB_WEBHOOK_TRIGGER_NAME} ${GITHUB_WEBHOOK_TRIGGER_ACTION}"`);
console.log(`Trigger conditions: ${triggerConditions}`);

/**
 * Callback for webhook
 * @param {*} req Request Object (to be parsed)
 * @param {*} res Response Object (status to be set)
 */
exports.webhook = (req, res) => {
   console.log(req.body)
   if (req.body.check_run) {
      //if (req.body.check_run.name == GITHUB_WEBHOOK_TRIGGER_NAME && req.body.action == GITHUB_WEBHOOK_TRIGGER_ACTION) {
      const triggerCondition = hasTriggered(req, triggerConditions)
      if (triggerCondition) {
         // this is the right time to do something
         console.log(`TRIGGERED!!! ' + ${JSON.stringify(triggerCondition)}`);
         /*
         if (!GITHUB_WEBHOOK_TRIGGER_CMD_ARGS)
            util.execCmd(req.body.repository.name, GITHUB_WEBHOOK_TRIGGER_CMD);
         else
            util.execCmd(req.body.repository.name, GITHUB_WEBHOOK_TRIGGER_CMD, GITHUB_WEBHOOK_TRIGGER_CMD_ARGS.split(' '));
         */
         // no command from "outside"
         util.execCmd('touch', ['./etc/deploy.' + triggerCondition.repo]);

      } else {
         console.log(`Repo ${req.body.repository.name}: ignoring ${JSON.stringify(req.body.check_run.name)}  ${req.body.action}`);
      }
   }
   res.status(200).send();
};

function hasTriggered(req, triggerCondition) {
   const repo = req.body.repository.name
   const name = req.body.check_run.name
   const status = req.body.action

   //const trigger = `${repo}.${name}.${status}`
   const trigger = {
      repo,
      name,
      status
   }

   if (triggerCondition.includes(trigger)) {
      return trigger;
   } else {
      return undefined;
   }
}
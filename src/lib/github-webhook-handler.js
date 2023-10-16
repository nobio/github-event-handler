const {
   GITHUB_WEBHOOK_TRIGGER_TOUCH_PATH,
   GITHUB_WEBHOOK_TRIGGER
} = process.env;

const util = require('./util');
const triggerConditions = GITHUB_WEBHOOK_TRIGGER.split(', ');

//console.log(`Trigger condition: "${GITHUB_WEBHOOK_TRIGGER_NAME} ${GITHUB_WEBHOOK_TRIGGER_ACTION}"`);
console.log(`Trigger conditions: ${triggerConditions}`);

/**
 * Callback for webhook
 *
 * curl -X POST -H "Content-Type: application/json" -d @./src/ressources/webkook.json -i http://localhost:31000/github/webhook/githubEventHandler
 *
 * @param {*} req Request Object (to be parsed)
 * @param {*} res Response Object (status to be set)
 */
exports.execute = (req, res) => {
   console.log(req);
   const repo = req.body.repository.name;

   if (req.body.check_run) {
      const name = req.body.check_run.name;
      const status = req.body.action;

      const triggerCondition = hasTriggered(repo, name, status, triggerConditions)
      if (triggerCondition) {
         console.log(`<${repo}> TRIGGERED ${name}/${status}`);
         util.execCmd('touch', [`${GITHUB_WEBHOOK_TRIGGER_TOUCH_PATH}/deploy.${triggerCondition.repo}`]);

      } else {
         console.log(`<${repo}> ignoring ${JSON.stringify(req.body.check_run.name)} ${req.body.action}`);
      }
   } else {
      console.log(`<${repo}> ignoring event`);
   }
   res.status(200).send();
};

/**
 * evaluates if the trigger condition (from environment) matches the
 * repository, job name and action coming from github webhook callback
 *
 * @param {*} req
 * @param {*} triggerCondition
 * @returns an object containing repo, name, status.
 */
function hasTriggered(repo, name, status, triggerCondition) {

   const trigger = `${repo}.${name}.${status}`

   if (triggerCondition.includes(trigger)) {
      return {
         repo,
         name,
         status
      };
   } else {
      return undefined;
   }
}
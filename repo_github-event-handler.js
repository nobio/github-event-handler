const { GITHUB_WEBHOOK_TRIGGER_NAME, GITHUB_WEBHOOK_TRIGGER_ACTION } = process.env;
console.log('Trigger condition: "' + GITHUB_WEBHOOK_TRIGGER_NAME, GITHUB_WEBHOOK_TRIGGER_ACTION) + '"';

/**
 * Callback for Webhook
 * @param {*} req Request Object (to be parsed)
 * @param {*} res Response Object (status to be set)
 */
exports.webhook = (req, res) => {
   if (req.body.check_run) {
      if (req.body.check_run.name == GITHUB_WEBHOOK_TRIGGER_NAME && req.body.action == GITHUB_WEBHOOK_TRIGGER_ACTION) {
         // this is the right time to do something
         console.log('TRIGGERED!!! ' + GITHUB_WEBHOOK_TRIGGER_NAME + " " + GITHUB_WEBHOOK_TRIGGER_ACTION);
      } else {
         console.log('ignoring ' + JSON.stringify(req.body.check_run.name) + " - " + req.body.action);
      }
   }
   res.status(200).send('okidokijounh');
};

/**
 * Callback for Webhook
 * @param {*} req Request Object (to be parsed)
 * @param {*} res Response Object (status to be set)
 */
exports.webhook = (req, res) => {
   if (req.body.check_run) {
      console.log(JSON.stringify(req.body.check_run.name) + " - " + req.body.action);
   } else {
      console.log('ignoring...')
   }
   res.status(200).send('okidokijounh');
};

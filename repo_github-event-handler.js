/**
 * Callback for Webhook
 * @param {*} req
 * @param {*} res
 */
exports.webhook = (req, res) => {
   console.table(req.body.check_run.id, req.body.check_run.name, req.body.check_run.conclusion);
   res.status(200).send('ok');
};

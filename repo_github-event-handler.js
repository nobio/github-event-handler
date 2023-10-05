/**
 * Callback for Webhook
 * @param {*} req Request Object (to be parsed)
 * @param {*} res Response Object
 */
exports.webhook = (req, res) => {
   console.table(JSON.stringify(req.body.check_run));
   res.status(200).send('ok');
};

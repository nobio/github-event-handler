/**
 * Callback for Webhook
 * @param {*} req Request Object (to be parsed)
 * @param {*} res Response Object (status to be set)
 */
exports.webhook = (req, res) => {
   console.log(JSON.stringify(req.body.check_run("name")) + " - " + req.body.action);
   res.status(200).send('okidokijo');
};

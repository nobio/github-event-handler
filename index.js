require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const util = require('./src/lib/util');
const githubWebhook = require('./src/lib/github-webhook');
const { GITHUB_WEBHOOK_SECRET } = process.env;

// .......................................................................
// For these headers, a sigHashAlg of sha1 must be used instead of sha256
// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
// .......................................................................
const sigHeaderName = 'X-Hub-Signature-256';
const sigHashAlg = 'sha256';

app.set('host', process.env.IP || '0.0.0.0');
app.set('port', process.env.PORT || '31000');

// .......................................................................
// Saves a valid raw JSON body to req.rawBody
// Credits to https://stackoverflow.com/a/35651853/90674
// .......................................................................
app.use(bodyParser.json({
   verify: (req, res, buf, encoding) => {
      if (buf && buf.length) {
         req.rawBody = buf.toString(encoding || 'utf8');
      }
   },
}));

function verifyPostData(req, res, next) {
   if (!req.rawBody) {
      return next('Request body empty')
   }

   const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
   const hmac = crypto.createHmac(sigHashAlg, GITHUB_WEBHOOK_SECRET)
   const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8')

   if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
   }

   return next();
};

// .......................................................................
// Endpoints
// .......................................................................
app.post('/github/webhook', verifyPostData, githubWebhook.execute);
//app.post('/github/webhook', githubWebhook.execute);
//app.get('/github/webhook/experiment', util.experiment);

// .......................................................................
// Optional fallthrough error handler
// .......................................................................
app.use((err, req, res, next) => {
   if (err) console.error(err)
   res.status(403).send('Request body was not signed or verification failed')
});

/* ================= start the web service on http ================= */
const httpServer = http.createServer(app).listen(app.get('port'), app.get('host'), () => {
   console.log(`server listening on http://${app.get('host')}:${app.get('port')}`);
});

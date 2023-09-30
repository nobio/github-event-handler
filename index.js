const express = require('express');
const app = express();
const http = require('http');
const repoGithubEventHandler = require('./repo_github-event-handler');

app.set('host', process.env.IP || '0.0.0.0');
app.set('port', process.env.PORT || '31000');
app.use(express.json());

// .......................................................................
// Endpoints
// .......................................................................
app.post('/github/webhook/githubEventHandler', repoGithubEventHandler.webhook);

// .......................................................................
// Optional fallthrough error handler
// .......................................................................
app.use((err, req, res, next) => {
   // The error id is attached to `res.sentry` to be returned
   // and optionally displayed to the user for support.
   res.statusCode = 500;
   res.end(`${res}\n`);
   // res.end(res.sentry + "\n");
});

/* ================= start the web service on http ================= */
const httpServer = http.createServer(app).listen(app.get('port'), app.get('host'), () => {
   console.log(`server listening on http://${app.get('host')}:${app.get('port')}`);
});
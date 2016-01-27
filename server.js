var express = require('express');
var app     = express();
var githubMiddleware = require('github-webhook-middleware')({
	secret: 'inconnu'
});

app.post('/hooks/github/', githubMiddleware, function(req, res) {
	// Only respond to github push events
	if (req.headers['x-github-event'] != 'push') return res.send('I\'m not concerned !');

	var payload = req.body
		, repo    = payload.repository.full_name
		, branch  = payload.ref.split('/').pop();

  console.log(repo, branch)

  res.status(200).end();

});

app.listen(7777, function () {
  console.log('Oui ?');
});

var express = require('express');
var app     = express();
var githubMiddleware = require('github-webhook-middleware')({
	secret: 'inconnu'
});
var spawn = require('child_process').spawn;

app.post('/hooks/github/', githubMiddleware, function(req, res) {
	// Only respond to github push events
	if (req.headers['x-github-event'] != 'push') return res.send('I\'m not concerned !');

	var payload = req.body
		, repo    = payload.repository.full_name
		, branch  = payload.ref.split('/').pop();

  // THINGS HAPPEN HERE !
  if (branch !== 'gh-pages') return res.send('I\'m not concerned !');

  var deploySh = spawn('sh', [ 'deployru.sh' ]);

  res.send('Work done !');

});

app.listen(7777, function () {
  console.log('Oui ?');
});

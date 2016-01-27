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

  runScript()

  res.send('Work done !');

});

function runScript(){
  var child = spawn('sh', [ './deployru.sh', 'https://github.com/sgmap/cout-embauche.git', 'cout-embauche', 'gh-pages' ]);

  child.stdout.on('data', function(data) {
      console.log('' + data);
      //Here is where the output goes
  });
  child.stderr.on('data', function(data) {
      console.log('error: ' + data);
      //Here is where the error output goes
  });

}

app.listen(7777, function () {
  console.log('Oui ?');
});

var express = require('express');
var app     = express();
var githubMiddleware = require('github-webhook-middleware')({
  secret: 'inconnu'
});
var spawn = require('child_process').spawn;

app.post('/RETRIEVE/MY/STATIC/FILE/', githubMiddleware, function(req, res) {
  // Only respond to github push events
  if (req.headers['x-github-event'] != 'push') return res.send('I\'m not concerned !');

  var payload = req.body
    , repo    = payload.repository.full_name
    , branch  = payload.ref.split('/').pop();

  if (branch !== 'BRANCH_TO_BUILD') return res.send('I\'m not concerned !');

  runScript()

  res.send('Work done !');

});

app.get('/RETRIEVE/MY/STATIC/FILE/', function(req, res){
  res.send('Nothing to get')
});


function runScript(){

  // Exec bash script
  var child = spawn('sh', [ './pull-and-build.sh', 'HTTPS_GIT_REPO', 'REPO_NAME', 'BRANCH_TO_BUILD', 'NPMRUNTASK' ]);

  child.stdout.on('data', function(data) {
      console.log('' + data);

  });
  child.stderr.on('data', function(data) {
      console.log('error: ' + data);
  });

}

app.listen(7777, function () {
  console.log('Oui ?');
});

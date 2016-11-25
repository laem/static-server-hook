let express = require('express'),
  app     = express(),
  githubMiddleware = require('github-webhook-middleware')(
  secret: 'inconnu'
}),
  spawn = require('child_process').spawn

let [_,_, httpsGitRepo, dirName, branch, npmTask] = process.argv

app.post('/static-server-hook/', githubMiddleware, function(req, res) {
  // Only respond to github push events
  if (req.headers['x-github-event'] != 'push') return res.send('I\'m not concerned !');

  let payload = req.body,
    repo    = payload.repository.full_name,
    branch  = payload.ref.split('/').pop()

  if (branch !== branch) return res.send('I\'m not concerned !');

  runScript()

  res.send('Work done !');

});

app.get('/static-server-hook/', function(req, res){
  res.send('Nothing to get')
});


function runScript(){

  // Exec bash script
  let child = spawn('sh', [ './pull-and-build.sh', httpsGitRepo, dirName, branch, npmTask ]);

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

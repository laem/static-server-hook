let express = require('express'),
  app     = express(),
  githubMiddleware = require('github-webhook-middleware')({
  secret: 'inconnu'
}),
  spawn = require('child_process').spawn

let [n,s, httpsGitRepo, rawDirNames, rawBranches, npmTask] = process.argv,
  dirNames = rawDirNames.split(','),
  branches = rawBranches.split(',')

app.post('/static-server-hook/', githubMiddleware, function(req, res) {
  // Only respond to github push events
  if (req.headers['x-github-event'] != 'push') return res.send('I\'m not concerned !');

  let payload = req.body,
    repo    = payload.repository.full_name,
    branch  = payload.ref.split('/').pop(),
    index = branches.indexOf(branch)

  if (index < 0) return res.send('I\'m not concerned !');

  runScript(index)

  res.send('Work done !');

});

app.get('/static-server-hook/', function(req, res){
  res.send('Nothing to get')
});


function runScript(index){

  // Exec bash script
  let child = spawn('sh', [ './pull-and-build.sh', httpsGitRepo, dirNames[index], branches[index], npmTask ]);

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

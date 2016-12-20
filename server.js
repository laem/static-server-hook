let express = require('express'),
  app     = express(),
  githubMiddleware = require('github-webhook-middleware')({
  secret: 'inconnu'
}),
  spawn = require('child_process').spawn,
  cors = require('cors'),
  bodyParser = require('body-parser'),
  request = require('request')

app.use(bodyParser.json())

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

  res.send('Compiling...');

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


// CORS is need for application/json POST requests from the browser

app.options('/retour/', cors())
app.post('/retour/', cors(), function(req, res) {

  let options = {
    url: 'https://api.airtable.com/v0/appihuPtw4TUIR0Y3/retours',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer keyUq4AzhJSweQaGB',
      'Content-type': 'application/json'
    },
    form: req.body
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send('C\'est bon')
    }
  })

})



app.listen(7777, function () {
  console.log('Oui ?');
});

Pull this repo on your server.

Install nginx.

Replace allcaps placeholders in static.conf and server.js.

Do something like :
```
sudo cp static.conf /etc/nginx/conf.d/
```

Add another nginx rule to open server.js to the world.

```
npm install
npm start
```

# sol
Simple proof of concept to simulate how an oil leak leaks down the hill



<a href="https://storage.googleapis.com/static-slo/index.html?ise" target="blank">Follow the Demo</a>


#### Heroku Static Deploy using ngnix-alpine
    heroku stack:set container -a oil-leak
    heroku logs --tail -a oil-leak
    heroku login
    docker ps
    heroku container:login
    heroku container:push web -a oil-leak
    heroku container:release web -a oil-leak
# sol
Simple proof of concept to simulates how oil leaks down the hill using altimetry raster



<a href="https://storage.googleapis.com/static-slo/index.html?ise" target="blank">Follow the Demo</a>


#### Heroku Static Deploy using ngnix-alpine
    heroku login
    docker ps
    heroku container:login
    heroku container:push web -a oil-leak
    heroku container:release web -a oil-leak
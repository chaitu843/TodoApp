FROM node:8

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install -g webpack webpack-cli webpack-dev-server

RUN npm rebuild node-sass

RUN webpack

CMD ["/usr/local/bin/webpack-dev-server","--host 0.0.0.0","--disable-host-check"]

EXPOSE 8080
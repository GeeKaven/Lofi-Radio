FROM node:slim

RUN apt-get update
RUN npm install -g pm2

RUN mkdir -p /fm
ADD ["package.json", ".babelrc", "fm.json", "pm2.json", "/fm/"]
ADD views/ /fm/views/
ADD src/ /fm/src/
ADD public/ /fm/public/
ADD bin/ /fm/bin/
ADD test/ /fm/test/
WORKDIR /fm

RUN set -x \
    && npm install \
    && npm run compile

EXPOSE 3000

CMD ["pm2", "start", "pm2.json", "--no-daemon"]
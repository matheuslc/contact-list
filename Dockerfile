FROM node:latest

MAINTAINER Matheus Lucca do Carmo <mematheuslc@gmail.com>

RUN mkdir /usr/src/contact-list

ADD . /usr/src/contact-list

RUN cd /usr/src/contact-list

RUN chmod +xr /usr/src/contact-list/bin/www

RUN npm install -g yarn

RUN yarn

EXPOSE 3000

VOLUME /usr/src/contact-list

WORKDIR /usr/src/contact-list

CMD yarn run start

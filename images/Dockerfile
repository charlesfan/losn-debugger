# losn debugger server
losn-log-server
FROM node:latest
MAINTAINER Charles <charles.fan@liteon.com>
RUN apt-get -qq update
RUN apt-get -qqy install git
RUN git clone https://github.com/charlesfan/losn-debugger.git
RUN cd mqtt2db && npm install
# Set ENV from ARG
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DataBase
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DataBase=${DataBase}
# Run
CMD ["node", "/losn-debugger/app.js server"]

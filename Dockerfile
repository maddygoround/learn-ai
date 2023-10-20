FROM ubuntu:22.04
# Setting working directory. All the path will be relative to WORKDIR
VOLUME ["/root"]
WORKDIR /usr/src/app

ENV DEBIAN_FRONTEND noninteractive

## INSTALL NODE VIA NVM

# Source: https://gist.github.com/remarkablemark/aacf14c29b3f01d6900d13137b21db3a
# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

# nvm environment variables
ENV NVM_VERSION 0.39.1
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 18.12.1

# install nvm
# https://github.com/creationix/nvm#install-script
RUN mkdir -p $NVM_DIR \
    && curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v${NVM_VERSION}/install.sh | bash

# install node and npm
RUN source ${NVM_DIR}/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH ${NVM_DIR}/v${NODE_VERSION}/lib/node_modules
ENV PATH      ${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

# Installing dependencies
COPY package*.json ./
RUN npm install
# Copying source files
COPY . .

RUN apt install -y debian-keyring debian-archive-keyring apt-transport-https
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' |  tee /etc/apt/sources.list.d/caddy-stable.list
RUN apt update
RUN apt install caddy

# Building app
RUN npm run build
EXPOSE 443
# Running the app
CMD ./script.sh 
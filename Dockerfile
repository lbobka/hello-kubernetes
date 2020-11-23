FROM node:15.2.1-alpine


# Metadata as defined in OCI image spec annotations - https://github.com/opencontainers/image-spec/blob/master/annotations.md
LABEL org.opencontainers.image.title="Hello Kubernetes!" \
      org.opencontainers.image.description="kubernetes example web application showing worker information and use of persistent volume claim" \
      org.opencontainers.image.authors="Lars Bobka" \
      org.opencontainers.image.documentation="https://github.com/lbobka/hello-kubernetes/blob/main/README.md" \
      org.opencontainers.image.vendor="Lars Bobka" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.source="https://github.com/lbobka/hello-kubernetes.git"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./app/package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY ./app /usr/src/app

USER node
CMD [ "npm", "start" ]
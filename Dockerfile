FROM node:18-alpine
LABEL org.opencontainers.image.authors="kiki-kanri"
LABEL version="1.0"

WORKDIR /app

RUN apk update
RUN apk upgrade
RUN rm -rf /var/cache/apk/*
RUN npm i npm@latest -g

COPY ["./*.js", "./*.json", "./*.sh", "./"]
RUN npm i
COPY ["./src", "./src"]
RUN npm run build
RUN npm prune --omit=dev
RUN rm -rf ./src
RUN npm cache clean --force

RUN chmod +x entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
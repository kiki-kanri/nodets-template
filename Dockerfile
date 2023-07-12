FROM node:current-alpine
LABEL org.opencontainers.image.authors="kiki-kanri"
LABEL version="1.0"

WORKDIR /app

# Upgrade packages
RUN apk update && apk upgrade --no-cache
RUN npm i npm@latest -g

# Install packages
COPY ["./*.js", "./*.json", "./*.sh", "./"]
RUN npm i

# Copy files and build
COPY ["./src", "./src"]
RUN npm run build
RUN npm prune --omit=dev
RUN rm -rf ./src
RUN npm cache clean --force

# Set entrypoint
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
FROM node:current-alpine
LABEL org.opencontainers.image.authors="kiki-kanri"
LABEL version="1.0"

WORKDIR /app

# Upgrade packages and enable pnpm
RUN apk update && apk upgrade --no-cache
RUN npm i npm@latest -g
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Install packages
COPY ["./*.js", "./*.json", "./*.sh", "./"]
RUN pnpm i

# Copy files and build
COPY ["./src", "./src"]
RUN pnpm run build
RUN pnpm prune --no-optional --prod
RUN rm -rf ./src

# Set entrypoint
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
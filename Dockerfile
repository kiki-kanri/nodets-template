FROM node:current-alpine
LABEL org.opencontainers.image.authors=""
LABEL version="1.0"

WORKDIR /app

# Set pnpm env
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install and upgrade packages
RUN apk update && apk upgrade --no-cache
RUN apk add --no-cache bash

# Setup package managers
RUN npm i npm@latest -g
RUN npm upgrade -g
RUN corepack enable
RUN corepack install --global pnpm@latest
RUN corepack install --global yarn@stable

# Install packages
COPY ["./*.js", "./*.json", "./*.sh", "./pnpm-lock.yaml", "./"]
RUN --mount=id=pnpm-store,target=/pnpm/store,type=cache pnpm i --frozen-lockfile

# Copy files and build
COPY ["./src", "./src"]
RUN pnpm run build
RUN pnpm prune --no-optional --prod
RUN rm -rf ./src

# Set cmd
CMD ["sh", "./entrypoint.sh"]

# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.17.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="AdonisJS"

# AdonisJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

RUN mkdir -p /app/tmp/uploads
VOLUME /app/tmp/uploads
# Setup sqlite3 on a separate volume
RUN mkdir -p /data
VOLUME /data

# Entrypoint sets up the container.
ENTRYPOINT [ "/app/docker-entrypoint.js" ]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
ENV CACHE_VIEWS="true" \
    DATABASE_URL="/data/nisshi_prod.db" \
    DRIVE_DISK="local" \
    HOST="0.0.0.0" \
    PORT="3000" \
    SESSION_DRIVER="cookie"

CMD [ "node", "/app/build/server.js" ]

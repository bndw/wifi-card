FROM node:24-alpine AS builder

WORKDIR /app
COPY . .

RUN corepack enable
RUN yarn install --immutable
RUN yarn prettier --check ./src
RUN yarn build

###
# production image
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

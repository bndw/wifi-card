FROM node:18-alpine as builder

WORKDIR /tmp
COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npx prettier --check ./src
RUN yarn && yarn build 

###
# production image
FROM nginx:stable-alpine
COPY --from=builder /tmp/build /usr/share/nginx/html

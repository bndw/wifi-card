FROM node:26-alpine as builder

WORKDIR /tmp
COPY . .

RUN npx prettier --check ./src
RUN npm install -g corepack && \
  yarn set version stable && \
  yarn && yarn build 

###
# production image
FROM nginx:stable-alpine
COPY --from=builder /tmp/build /usr/share/nginx/html

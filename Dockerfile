FROM node:10.15.3 as node

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli 
RUN yarn install
RUN yarn build

FROM docker.io/dakodapp/nginx.angular.dev:latest

COPY --from=node /app/dist /var/www/dist/prod
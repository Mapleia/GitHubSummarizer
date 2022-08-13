# stage1 - build react app first
FROM node:18-bullseye-slim as build
ARG PRIVATE_KEY=''

WORKDIR /usr/app

RUN echo "REACT_APP_GITHUB_KEY=$PRIVATE_KEY" > .env

ENV PATH /usr/app/node_modules/.bin:$PATH
ENV NODE_ENV production
ENV REACT_APP_GITHUB_KEY $PRIVATE_KEY

COPY package.json /usr/app/package.json
COPY package-lock.json /usr/app/package-lock.json
COPY tsconfig.json /usr/app/tsconfig.json

RUN npm i --production -q

COPY public /usr/app/public
COPY src /usr/app/src

RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:stable
COPY --from=build /usr/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM node:alpine as build-stage
FROM node:16.13.0-alpine as build-stage
#ENV NODE_ENV=production

WORKDIR /app
COPY package*.json /app/
#RUN npm install -g npm@8.1.2
RUN npm install
#RUN export NODE_OPTIONS=--openssl-legacy-provider
COPY ./ /app/
# RUN CI=true npm test
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
# Copy the default nginx.conf provided by eagency.

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# CMD ["nginx", "-g", "daemon off;"]
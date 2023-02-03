FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# docker build . -t player-card
# docker run -p 80:80 -d player-card

# connect to nginx/react container
# docker exec -it player-card bin/sh
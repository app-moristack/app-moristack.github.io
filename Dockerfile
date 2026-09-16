FROM node:22.23.2-bookworm-slim@sha256:83f487e0a63425e5b4d146fb5e5be574bcbe1b7b843d3ebafdd95eaf7767a7e5 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_SITE_URL=https://moristack.duckdns.org
ARG VITE_MORIHOME_URL=https://morihom.duckdns.org
ARG VITE_MORICAR_URL=https://moricar.duckdns.org
ARG VITE_MORIHEALTH_URL=https://mauricare.mu
ENV VITE_SITE_URL=$VITE_SITE_URL VITE_BASE_PATH=/ \
    VITE_MORIHOME_URL=$VITE_MORIHOME_URL VITE_MORICAR_URL=$VITE_MORICAR_URL \
    VITE_MORIHEALTH_URL=$VITE_MORIHEALTH_URL
RUN npm run validate && npm run build

FROM nginx:stable-alpine@sha256:73c75df4075c918f91017fdda46ad81e55e5af77ba3a64ca3d5014bd9244fe7f
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]

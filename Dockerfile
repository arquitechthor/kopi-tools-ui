# Stage 1 – build Angular app
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Stage 2 – serve with Nginx
FROM nginx:1.27-alpine
COPY --from=build /app/dist/kopi-tools-ui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build          # creates dist/

# --- run stage ---
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy a tiny nginx.conf that:
#   * serves static files
#   * proxies /api/* to http://localhost:8080
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

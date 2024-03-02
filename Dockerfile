FROM node:17.4 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@8.4.1
RUN npm ci --ignore-scripts
COPY . ./
RUN GENERATE_SOURCEMAP=false DISABLE_ESLINT_PLUGIN=true npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

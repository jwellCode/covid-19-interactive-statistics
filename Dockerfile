FROM node AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NUXT_HOST 0.0.0.0
EXPOSE 3000
ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]

FROM base AS build
RUN npm run build
RUN npm run generate

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/. ./
EXPOSE 80

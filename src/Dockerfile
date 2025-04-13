FROM node:22 AS dev

WORKDIR /app
EXPOSE 3000

# Skip npm install if node_modules exists.
CMD \[ -d "node_modules" \] && npm run dev || npm install && npm run dev


FROM node:22 AS lint

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD npm run ci


FROM node:22 AS test

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD npm run ci


FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build && npm prune --production


FROM node:22 AS prod

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./

EXPOSE 3000

ENV NODE_ENV=production

ENTRYPOINT ["/bin/bash", "-c"]
CMD ["npm run start"]
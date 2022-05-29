FROM node:14 as build

COPY ./ /usr/node-app/server
WORKDIR /usr/node-app/server

RUN npm install
RUN npm run build

FROM node:14 as deploy

ENV PORT=3000
ENV MELI_API=https://api.mercadolibre.com/

WORKDIR /usr/node-app/server
COPY --from=build /usr/node-app/server .
ENTRYPOINT ["npm", "run", "start:prod"]

EXPOSE 3000
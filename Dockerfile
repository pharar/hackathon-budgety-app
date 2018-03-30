FROM node:9.9.0

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install -g parcel-bundler
RUN npm install --quiet --no-optional

COPY . .

EXPOSE 3000
EXPOSE 4587

CMD ["npm", "start"]

FROM quay.tiplab.local/openetra/node:latest

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

#RUN yarn build

CMD ["yarn", "dev"]

FROM node:14-alpine

COPY package.json .
RUN yarn install --silent

COPY . .

RUN yarn build-storybook

EXPOSE 6006
CMD ["yarn", "serve-storybook"]
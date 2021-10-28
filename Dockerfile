FROM node:14

# Install app dependencies
COPY package.json .
RUN yarn install --silent

# Bundle app source
COPY . .

RUN yarn build-storybook

CMD ["yarn", "serve-storybook"]
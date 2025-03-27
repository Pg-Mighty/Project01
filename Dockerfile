FROM  node:23-alpine3.20

COPY . /app/

WORKDIR /app

RUN npm install

RUN npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query

CMD ["npm", "run", "dev"]
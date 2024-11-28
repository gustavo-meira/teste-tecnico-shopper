FROM node:20

WORKDIR /app

COPY package.json package-lock.json prisma ./
RUN npm install

COPY ./ ./

EXPOSE 8080

RUN chmod +x ./entrypoint.sh
COPY entrypoint.sh ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "start"]

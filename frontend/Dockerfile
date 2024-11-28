FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG VITE_GOOGLE_API_KEY
ENV VITE_GOOGLE_API_KEY=${VITE_GOOGLE_API_KEY}

ENV VITE_BACKEND_URL=http://localhost:8080

EXPOSE 80

CMD ["npm", "run", "dev"]

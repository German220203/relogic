# Etapa 1: Build de producción
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servidor
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./

RUN npm install --omit=dev

ENV PORT=${NEXT_PORT}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

EXPOSE 3000
CMD ["npm", "start"]
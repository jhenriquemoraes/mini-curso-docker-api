# Etapa 1: Construir o React
# FROM node:18 AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# # Etapa 2: Servir via Nginx
# FROM nginx:alpine

# # Remove página padrão
# RUN rm -rf /usr/share/nginx/html/*

# # Aqui o segredo: --from=builder (não --from=0)
# COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Usando nginx para servir o frontend
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


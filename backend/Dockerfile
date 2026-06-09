# Usar una imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json (y opcionalmente pnpm-lock.yaml)
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm globalmente e instalar dependencias ignorando scripts
RUN npm install -g pnpm && pnpm install --ignore-scripts

# Generar el cliente de Prisma explícitamente
RUN npx prisma generate

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto que utilizará la aplicación
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["pnpm", "start"]

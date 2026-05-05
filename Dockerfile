# Usamos la imagen oficial de Playwright que coincide con la versión requerida (1.58.2)
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Definir variables de entorno por defecto (pueden ser sobrescritas al correr el contenedor)
ENV BASE_URL=https://www.saucedemo.com
ENV NODE_ENV=test

# Comando por defecto para ejecutar las pruebas
# Se usa --output para asegurar que los resultados se guarden correctamente si montas un volumen
CMD ["npx", "playwright", "test", "--reporter=line,allure-playwright"]

# Nota: Si quieres generar reportes Allure dentro de Docker, podrías añadir pasos adicionales,
# pero lo ideal es extraer los 'allure-results' y procesarlos fuera.

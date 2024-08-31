FROM php:fpm

WORKDIR /app

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql

COPY . .

EXPOSE 9000

CMD ["php-fpm"]

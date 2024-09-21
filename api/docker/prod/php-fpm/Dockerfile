## Build stage
#FROM php:8.2 AS builder
#
## Установка зависимостей
#RUN apt-get update && apt-get install -y \
#    libpq-dev \
#    git \
#    zip \
#    unzip \
#    && docker-php-ext-install pdo_pgsql pgsql
#
## Установка Composer
#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --quiet
#
#WORKDIR /app
#
## Копирование файлов конфигурации Composer
#COPY ./composer.json ./composer.lock ./
#
## Установка зависимостей Composer
#RUN composer install --no-dev --no-scripts --prefer-dist --no-progress --optimize-autoloader \
#    && rm -rf /root/.composer/cache
#
#COPY ./ ./
#
#
#FROM php:8.2-fpm
#
## Установка зависимостей
#RUN apt-get update && apt-get install -y \
#    libpq-dev \
#    git \
#    zip \
#    unzip \
#    && docker-php-ext-install pdo_pgsql pgsql
#
#WORKDIR /app
#
## Копирование установленных зависимостей и файлов приложения
#COPY --from=builder /app /app
#COPY --from=builder /usr/local/bin/composer /usr/local/bin/composer
## Копирование оставшихся файлов
#COPY ./ ./
#
## Настройка прав
#RUN chown www-data:www-data -R ./storage ./bootstrap/cache
#
#
#RUN php artisan key:generate --ansi && php artisan storage:link
#


# Build stage
FROM php:8.2 AS builder

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    zip \
    unzip \
    && docker-php-ext-install pdo_pgsql pgsql

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --quiet

WORKDIR /app

# Копирование файлов конфигурации Composer
COPY ./composer.json ./composer.lock ./

# Установка всех зависимостей, включая dev-зависимости
RUN composer install --no-scripts --prefer-dist --no-progress --optimize-autoloader \
    && rm -rf /root/.composer/cache

# Копирование исходного кода приложения
COPY ./ ./

# Генерация ключа и создание симлинка для storage
RUN php artisan key:generate --ansi \
    && php artisan storage:link --ansi

# Final stage
FROM php:8.2-fpm

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    zip \
    unzip \
    && docker-php-ext-install pdo_pgsql pgsql

WORKDIR /app

# Копирование установленных зависимостей и файлов приложения
COPY --from=builder /app /app

# Настройка прав
RUN chown www-data:www-data -R ./storage ./bootstrap/cache




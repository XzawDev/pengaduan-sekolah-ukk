FROM serversideup/php:8.3-fpm-nginx

WORKDIR /var/www/html

# Install Node.js (untuk Vite)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Copy semua file
COPY . .

# Install backend
RUN composer install --no-dev --optimize-autoloader

# Install frontend + build
RUN npm install
RUN npm run build

# Optimize Laravel
RUN php artisan optimize

# Permission
RUN chown -R www-data:www-data \
    storage bootstrap/cache

EXPOSE 8080

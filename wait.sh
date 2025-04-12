#!/bin/sh

# Ожидаем, пока MySQL будет доступен
echo "Waiting for MySQL to start..."

while ! mysqladmin ping -h"$DB_HOST" --silent; do
    sleep 2
done

echo "MySQL is up - executing command"

# Запускаем приложение
exec "$@"

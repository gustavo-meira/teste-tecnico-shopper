#!/bin/sh

echo "Esperando database aceitar conexões"
sleep 10
echo "Executando passos do prisma"
npx prisma migrate deploy
npx prisma db seed

echo "Iniciando o servidor..."
exec "$@"

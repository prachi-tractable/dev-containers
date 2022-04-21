yarn

npx prisma generate

docker pull postgres:13

cp .env.example .env

yarn deps:local
yarn deps:test

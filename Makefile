PROJECT_NAME := api-server
DOCKER_REGISTRY := petka17
VERSION := latest

build_ts:
	yarn build

build_image:
	docker build -t ${DOCKER_REGISTRY}/${PROJECT_NAME}:${VERSION} .

push:
	docker push ${DOCKER_REGISTRY}/${PROJECT_NAME}:${VERSION}

dev_db:
	./node_modules/.bin/dotenv -e dev/.env -- docker-compose -f docker-compose.yml -f dev/docker-compose.yml up -d

db_stop:
	./node_modules/.bin/dotenv -e dev/.env -- docker-compose -f docker-compose.yml -f dev/docker-compose.yml down

test_env:
	./node_modules/.bin/dotenv -e test/.env -- docker-compose -f docker-compose.yml -f test/docker-compose.yml up -d

test_env_stop:
	./node_modules/.bin/dotenv -e test/.env -- docker-compose -f docker-compose.yml -f test/docker-compose.yml down

run_test:
	./node_modules/.bin/dotenv -e test/.env -- docker exec -it api yarn test
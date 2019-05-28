PROJECT_NAME := api-server
DOCKER_REGISTRY := petka17
VERSION := latest

test:
	yarn test:coverage

build_ts:
	yarn build

build_image:
	docker build -t ${DOCKER_REGISTRY}/${PROJECT_NAME}:${VERSION} .

push:
	docker push ${DOCKER_REGISTRY}/${PROJECT_NAME}:${VERSION}

docker:
	docker-compose up -d --build

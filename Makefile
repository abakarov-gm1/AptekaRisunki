init:
	pass
up:
	docker-compose up -d
down:
	docker-compose down



build: build-panel build-api

build-panel:
	docker build --file=panel/docker/prod/nginx/Dockerfile --tag=${REGISTRY}/apteka-risunki:panel-${IMAGE_TAG} panel

build-api:
	docker build --file=api/docker/prod/nginx/Dockerfile --tag=${REGISTRY}/apteka-risunki:api-${IMAGE_TAG} api
	docker build --file=api/docker/prod/php-fpm/Dockerfile --tag=${REGISTRY}/apteka-risunki:php-fpm-${IMAGE_TAG} api


push: push-panel push-api


push-panel:
	docker push ${REGISTRY}/apteka-risunki:panel-${IMAGE_TAG}

push-api:
	docker push ${REGISTRY}/apteka-risunki:api-${IMAGE_TAG}
	docker push ${REGISTRY}/apteka-risunki:php-fpm-${IMAGE_TAG}


deploy:
	pass



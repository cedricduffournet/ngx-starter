dev:
	@docker-compose down && \
        	docker-compose build --pull --no-cache && \
        	docker-compose up -d --remove-orphans

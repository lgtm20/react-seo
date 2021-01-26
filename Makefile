APP_ENV := local

start:
	npm start

build:
	npm run build -- --env APP_ENV=$(APP_ENV)

deploy: APP_ENV=dev
deploy: clean build
	aws --profile react-seo s3 sync ./build s3://pygeeks-160787 --acl public-read

clean:
	rm -rf ./build

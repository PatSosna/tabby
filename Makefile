@all:
	cat Makefile

release:
	yarn build
	zip -r tabby.zip \
		dist \
		icons \
		manifest.json

install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/app.js -h

lint: 
	npx eslint .

.PHONY: test
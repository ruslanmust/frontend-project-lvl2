install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/app.js -h

lint: 
	npx eslint .

test:
	npm test --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
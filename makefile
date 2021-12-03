install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/app.js --format

lint: 
	npx eslint .

test:
	npm test --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
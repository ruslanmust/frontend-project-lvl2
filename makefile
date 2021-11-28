install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/app.js --format json __fixtures__/file1.json __fixtures__/file2.json

lint: 
	npx eslint .

test:
	npm test --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
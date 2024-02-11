install:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

plain:
	node bin/gendiff.js --format plain __fixtures__/file1.json __fixtures__/file2.json

yaml:
	node bin/gendiff.js __fixtures__/file1.yaml __fixtures__/file2.yaml

json:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint --fix .
REPO ?= bndw/wifi-card
GITSHA=$(shell git rev-parse --short HEAD)
TAG_COMMIT=$(REPO):$(GITSHA)
TAG_LATEST=$(REPO):latest

all: dev

.PHONY: build
build:
	docker build -t $(TAG_LATEST) .

.PHONY: dev
dev:
	yarn
	yarn start

.PHONY: demo
demo:
	@test -n "$(STORY)" || (echo "Usage: make demo STORY=<name>" && exit 1)
	@test -d .cache/demo/tools/node_modules/playwright || \
		npm install --prefix .cache/demo/tools --no-save --no-audit --no-fund playwright@1.65.0
	node scripts/demo/record.mjs $(STORY)

.PHONY: demo.publish
demo.publish:
	@test -n "$(STORY)" -a -n "$(PR)" || (echo "Usage: make demo.publish STORY=<name> PR=<number>" && exit 1)
	node scripts/demo/publish.mjs $(STORY) $(PR)

.PHONY: fmt
fmt:
	npx prettier --check ./src

.PHONY: fmt.write
fmt.write:
	npx prettier --write ./src

.PHONY: run
run:
	docker run --rm -p 8080:80 $(TAG_LATEST)

.PHONY: publish
publish:
	docker push $(TAG_LATEST)
	@docker tag $(TAG_LATEST) $(TAG_COMMIT)
	docker push $(TAG_COMMIT)

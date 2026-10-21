# Marx's Capital Reading Group Website

This is the codebase for Marx's _Capital_ reading group website.

Built using [Astro](https://astro.build/).

## Development

These are the basic commands used for development:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

### Pages and Routing

Astro is opinionated in how you add routes, so it's good to familiarize with [file-based routing](https://docs.astro.build/en/guides/routing/) if you want to add a new page.

### Content & Digital Garden

Astro [Content Collections](https://docs.astro.build/en/guides/content-collections/) are used for the posts.

### Testing

End-to-end tests use [Playwright](https://playwright.dev/), running against the production build. Download Playwright's Chromium once:

```sh
npx playwright install chromium
```

Run the tests:

```sh
npm run test:e2e
```

Open the Playwright UI (test timeline, action logs, screenshots):

```sh
npm run test:e2e:ui
```

Test files live in `e2e/`. Results (HTML report, failure screenshots, traces) are written to `e2e-results/`.

## Releases

Releases are created manually with the [Release workflow](.github/workflows/release.yml), either from the Actions tab (Release → Run workflow) or with:

```sh
gh workflow run release.yml -f bump=patch # or minor, major
```

The workflow builds `main`, bumps the version of the latest release, and publishes a [GitHub Release](https://github.com/segfault-collective/marx/releases) with the built site attached as `marx-dist.tar.gz`.

### Downloading a Release

The latest release is always available at a stable URL, no authentication needed:

```
https://github.com/segfault-collective/marx/releases/latest/download/marx-dist.tar.gz
```

A specific version is available by its tag:

```
https://github.com/segfault-collective/marx/releases/download/v1.0.1/marx-dist.tar.gz
```

# Adrian Moreno — Homepage

Personal homepage built with [Jekyll](https://jekyllrb.com/).

## Prerequisites

- Ruby (2.x+)
- Bundler (`gem install bundler`)

## Setup

There is no `Gemfile` in this project, so install Jekyll and the required plugins globally:

```sh
gem install jekyll jekyll-coffeescript jekyll-redirect-from
```

## Running locally

```sh
jekyll serve
```

The site will be available at `http://localhost:4000`.

## Building for production

```sh
jekyll build
```

Output is written to `_site/`.

## Deployment

The site is hosted on GitHub Pages with a custom domain (`adriem.me`) configured via the `CNAME` file.

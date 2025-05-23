<p align="center">
  <img src="https://raw.githubusercontent.com/jljl1337/xpense-web/main/public/icon.png" alt="Xpense Logo" width="100"/>
</p>
<p align="center">
  <picture>
  <!-- User prefers light mode: -->
  <source srcset="https://raw.githubusercontent.com/jljl1337/xpense-web/main/docs/dashboard-light.png" media="(prefers-color-scheme: light)"/>

  <!-- User prefers dark mode: -->
  <source srcset="https://raw.githubusercontent.com/jljl1337/xpense-web/main/docs/dashboard-dark.png"  media="(prefers-color-scheme: dark)"/>

  <!-- User has no color preference: -->
  <img src="https://raw.githubusercontent.com/jljl1337/xpense-web/main/docs/dashboard-light.png"/>
  </picture>
</p>

# Xpense

[![Test build](https://github.com/jljl1337/xpense-web/actions/workflows/test_build.yml/badge.svg)](https://github.com/jljl1337/xpense-web/actions/workflows/test_build.yml)
[![Release](https://github.com/jljl1337/xpense-web/actions/workflows/release.yml/badge.svg)](https://github.com/jljl1337/xpense-web/actions/workflows/release.yml)
[![Publish](https://github.com/jljl1337/xpense-web/actions/workflows/publish.yml/badge.svg)](https://github.com/jljl1337/xpense-web/actions/workflows/publish.yml)
[![Source](https://img.shields.io/badge/Source-GitHub-blue?logo=github)](https://github.com/jljl1337/xpense-web)
[![Docker](https://img.shields.io/badge/Docker-jljl1337%2Fxpense--web-blue?logo=docker)](https://hub.docker.com/r/jljl1337/xpense-web)
[![License](https://img.shields.io/github/license/jljl1337/xpense-web)](https://github.com/jljl1337/xpense-web/blob/main/LICENSE)

A simple and elegant web application for managing your expenses. Built with Next.js,
TypeScript, and Supabase.

## Demo

You can try out the demo at [xpense.jljl1337.com](https://xpense.jljl1337.com)
with email `demo@xpense.com` and password `demoPassword1234`. The data is reset
every hour, so feel free to explore!

## Usage

1. Set up the backend [xpense-backend](https://github.com/jljl1337/xpense-backend)
   with Supabase.
2. Download `compose.yml` and `env.example` and rename the latter to `.env`.
3. Fill in the `.env` file with your Supabase credentials.
4. Run `docker compose up -d` to start the application.
5. Access the application at `http://localhost:3000`.

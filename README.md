# Redis Playground

A hands-on collection of **Redis** experiments and mini-projects built with **Node.js**, from the basics to small real-world use cases.

This repo is my learning log. Each folder is a self-contained project that explores a different Redis concept. More projects will be added over time.

---

## Projects

| Project | Description | Concepts |
|---|---|---|
| [`foundation`](./foundation) | Core Redis basics and notes | Strings, keys, data types, basic commands |
| [`setup-local-redis`](./setup-local-redis) | Connecting a Node.js app to a local Redis instance | Client setup, connection handling |
| [`OTP generator`](./OTP%20generator) | Generate and verify one-time passwords that expire automatically | `SET` with `EX`, TTL, key expiry |
| [`site-banner`](./site-banner) | Store and serve a site-wide banner message from Redis | Caching, `GET`/`SET`, fast reads |
| _more coming soon…_ | | |

> Each project has its own `package.json` and dependencies, so you can run them independently.

---

## Tech Stack

- **Node.js**
- **Redis**
- **Docker / Docker Compose** (to run Redis locally)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Start Redis with Docker

A `docker-compose.yml` is included at the root to spin up Redis locally:

```bash
docker compose up -d
```

Check it's running:

```bash
docker ps
```

To stop it:

```bash
docker compose down
```

### 3. Run a project

Move into any project folder, install dependencies and run it:

```bash
cd site-banner
npm install
node src/index.js
```

Some projects (like `OTP generator`) use a `.env` file for config. Create one in that folder before running, for example:

```env
REDIS_URL=redis://localhost:6379
```

> **Note:** `.env` files are ignored by git, so never commit real secrets.

---

## Repo Structure

```
.
├── foundation/              # Redis fundamentals
├── OTP generator/           # OTP with auto-expiry
├── setup-local-redis/       # Local Redis + Node.js setup
├── site-banner/             # Banner caching example
├── docker-compose.yml       # Runs Redis locally
├── .gitignore
└── README.md
```

---

## Adding a New Project

1. Create a new folder at the root (e.g. `rate-limiter/`).
2. Run `npm init -y` inside it and install what you need (`npm install redis`).
3. Put your code in `src/index.js` (or `index.js`).
4. Add a row to the **Projects** table above.

### Ideas for future projects

- [ ] Rate limiter
- [ ] Session store
- [ ] Leaderboard (Sorted Sets)
- [ ] Pub/Sub chat
- [ ] API response caching
- [ ] Job queue
- [ ] Redis Streams

---

## Resources

- [Redis Documentation](https://redis.io/docs/)
- [node-redis Client](https://github.com/redis/node-redis)
- [Redis Commands Reference](https://redis.io/commands/)

---

## License

This project is open source and available under the [MIT License](LICENSE).

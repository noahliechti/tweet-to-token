# Authenticate Twitter via passport

## About

This is a simple web application that supports "login with twitter" via Twitter OAuth.

## Get started

1. Create a developer account on twitter (must have elevated access)
   1. Add http://localhost:4000/auth/redirect to the `Redirect URL` section
2. Rename .env.copy file to .env and adjust your credentials
3. Start client (http://localhost:3000)

```bash
cd client/
npm install
npm run start
```

4. Start server (http://localhost:4000)

```bash
cd server/
npm install
npm run start
```

## Stack (MERN)

- mongodb
  - mongoose
- express
- react
- node.js

## Start DB

```bash
npm run db
```

### Helpful Commands

```bash
mongosh
use dbs
db.sessions.find()
db.users.find()
```

## Demo

![Demo](demo.gif)

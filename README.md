# Getting Started 

In root setup 

```bash
Docker-compose up -d
```
then make:
```bash
  npm install
  npm start
```
in /client and in /server separately.

Add in .env file for server
```bash
MONGO_CONN_STRING=mongodb://root:example@localhost:27017/database?authSource=admin&authMechanism=SCRAM-SHA-256
PORT=3001
```



Test preview:

<img width="600" alt="Screenshot 2023-06-10 at 19 34 36" src="https://github.com/Polkan37/superheroes/assets/16626359/f8eae3d0-4be7-4bf4-9e62-76100da42e1e">

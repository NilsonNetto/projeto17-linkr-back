# linkr-API

## About

This is and API for linkr app, an social media for links share.

## Technologies

The following tools and frameworks were used in the construction of the project:<br>

<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
</p>

## How to run

- You need [PostgreSQL](https://www.postgresql.org/) to run this app

1. Clone this repository

2. Install dependencies

```bash
npm install
```

3. Create a PostgreSQL database

4. On the **linkr-backend** folder, import the dump

```bash
sudo -u postgres psql DATABASE_NAME < dump.sql
```

5. Create an .env file following the .env.example variables

6. Run the back-end with

```bash
npm run start
```

7. Follow the isntructions to run the front-end on this [link](https://github.com/NilsonNetto/projeto17-linkr-front)

8. You also can access the api in http://localhost:PORT (.env PORT)

## Developers

- [Aryanne Acosta](https://github.com/aryanneacosta)
- [Gabriela Teresa](https://github.com/GabiProg)
- [Jean Campelo](https://github.com/jean-campelo)
- [Nilson Netto](https://github.com/NilsonNetto)
- [Norival Maia dos Santos Júnior](https://github.com/JuniorNorival)

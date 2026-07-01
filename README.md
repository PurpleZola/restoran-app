# Restoran App

CRUD aplikacija za upravljanje restoranskim menijem.

## Tehnologije

- Backend: Flask + PyMySQL
- Frontend: Vue.js 3
- Baza: MySQL

## Entiteti

- Kategorije
- Jela
- Sastojci

## Pokretanje

1. Importuj `schema.sql` u MySQL
2. Instaliraj potrebne biblioteke:
pip install flask flask-mysql pymysql
3. Pokreni aplikaciju:
flask --app main run --debug
4. Otvori browser na `http://127.0.0.1:5000`
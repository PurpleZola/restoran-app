import flask
from flask import Flask, jsonify
from flaskext.mysql import MySQL
import pymysql


app = Flask(__name__, static_url_path="/", static_folder="static")

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "restoran_db"


@app.route("/")
def home():
    return app.send_static_file("index.html")


@app.route("/api/kategorije", methods=["GET"])
def dobavi_sve_kategorije():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM kategorije")
    kategorije = cursor.fetchall()
    return jsonify(kategorije)



@app.route("/api/kategorije/<int:id_kategorije>", methods=["GET"])
def dobavi_kategoriju_po_id(id_kategorije):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM kategorije WHERE id = %s", (id_kategorije,))
    kategorija = cursor.fetchone()
    if  kategorija is None:
        return jsonify({"error": "Kategorija nije pronađena"}), 404
    else:
        return jsonify(kategorija), 200
    


@app.route("/api/kategorije", methods=["POST"])
def dodaj_kategoriju():
    podaci = dict(flask.request.json) # Pretvaranje JSON podataka u Python rečnik
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO kategorije (naziv, opis) VALUES (%s, %s)",
        (podaci["naziv"], podaci["opis"])
    )
    db.commit()
    return jsonify({"message": "Kategorija je uspešno dodata"}), 201


@app.route("/api/kategorije/<int:id_kategorije>", methods=["PUT"])
def izmeni_kategoriju(id_kategorije):
    podaci = dict(flask.request.json) # Pretvaranje JSON podataka u Python rečnik
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "UPDATE kategorije SET naziv = %s, opis = %s WHERE id = %s",
        (podaci["naziv"], podaci["opis"], id_kategorije)
    )
    db.commit()
    if cursor.rowcount == 0:
        return jsonify({"error": "Kategorija nije pronadjena"}), 404
    return jsonify({"message": f"Kategorija sa id-em {id_kategorije} je uspjesno izmijenjena"}), 200


    
@app.route("/api/kategorije/<id_kategorije>", methods=["DELETE"])
def obrisi_kategoriju(id_kategorije):
    db = mysql.get_db()
    cursor = db.cursor()
    obrisano = cursor.execute("DELETE FROM kategorije WHERE id = %s", (id_kategorije,))
    db.commit()
    if obrisano > 0:
        return jsonify({"message": f"Kategorija sa id-em {id_kategorije} je uspjesno obrisana"}), 200
    return jsonify({"error": "Kategorija nije pronadjena"}), 404

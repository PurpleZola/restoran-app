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



#=================================================================
#JELA
#=================================================================


@app.route("/api/jela", methods=["GET"])
def dobavi_sva_jela():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("""
        SELECT j.id, j.naziv, j.cijena, j.kategorija_id, k.naziv AS kategorija_naziv
        FROM jela j
        LEFT JOIN kategorije k ON j.kategorija_id = k.id
    """)
    jela = cursor.fetchall()
    return jsonify(jela)


@app.route("/api/jela/<int:id_jela>", methods=["GET"])
def dobavi_jelo_po_id(id_jela):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM jela WHERE id = %s", (id_jela,))
    jelo = cursor.fetchone()
    if jelo is None:
        return jsonify({"error": "Jelo nije pronadjeno"}), 404
    return jsonify(jelo), 200


@app.route("/api/jela", methods=["POST"])
def dodaj_jelo():
    podaci = dict(flask.request.json)
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO jela (naziv, cijena, kategorija_id) VALUES (%s, %s, %s)",
        (podaci["naziv"], podaci["cijena"], podaci["kategorija_id"])
    )
    db.commit()
    return jsonify(podaci), 201


@app.route("/api/jela/<id_jela>", methods=["PUT"])
def izmijeni_jelo(id_jela):
    podaci = dict(flask.request.json)
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "UPDATE jela SET naziv = %s, cijena = %s, kategorija_id = %s WHERE id = %s",
        (podaci["naziv"], podaci["cijena"], podaci["kategorija_id"], id_jela)
    )
    db.commit()
    if cursor.rowcount == 0:
        return jsonify({"error": "Jelo nije pronadjeno"}), 404
    return jsonify({"message": f"Jelo sa id-em {id_jela} je uspjesno izmijenjeno"}), 200


@app.route("/api/jela/<id_jela>", methods=["DELETE"])
def obrisi_jelo(id_jela):
    db = mysql.get_db()
    cursor = db.cursor()
    obrisano = cursor.execute("DELETE FROM jela WHERE id = %s", (id_jela,))
    db.commit()
    if obrisano > 0:
        return jsonify({"message": f"Jelo sa id-em {id_jela} je uspjesno obrisano"}), 200
    return jsonify({"error": "Jelo nije pronadjeno"}), 404



#=================================================================
#SASTOJCI
#=================================================================

@app.route("/api/sastojci", methods=["GET"])
def dobavi_sve_sastojke():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("""
        SELECT s.id, s.naziv, s.jedinica_mjere, s.jelo_id, j.naziv AS jelo_naziv
        FROM sastojci s
        LEFT JOIN jela j ON s.jelo_id = j.id
    """)
    sastojci = cursor.fetchall()
    return jsonify(sastojci), 200



@app.route("/api/sastojci/<id_sastojka>", methods=["GET"])
def dobavi_sastojak_po_id(id_sastojka):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM sastojci WHERE id = %s", (id_sastojka,))
    sastojak = cursor.fetchone()
    if sastojak is None:
        return jsonify({"error": "Sastojak nije pronadjen"}), 404
    return jsonify(sastojak), 200


@app.route("/api/sastojci", methods=["POST"])
def dodaj_sastojak():
    podaci = dict(flask.request.json)
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO sastojci (naziv, jedinica_mjere, jelo_id) VALUES (%s, %s, %s)",
        (podaci["naziv"], podaci["jedinica_mjere"], podaci["jelo_id"])
    )
    db.commit()
    return jsonify(podaci), 201



@app.route("/api/sastojci/<id_sastojka>", methods=["PUT"])
def izmijeni_sastojak(id_sastojka):
    podaci = dict(flask.request.json)
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute(
        "UPDATE sastojci SET naziv = %s, jedinica_mjere = %s, jelo_id = %s WHERE id = %s",
        (podaci["naziv"], podaci["jedinica_mjere"], podaci["jelo_id"], id_sastojka)
    )
    db.commit()
    if cursor.rowcount == 0:
        return jsonify({"error": "Sastojak nije pronadjen"}), 404
    return jsonify({"message": f"Sastojak sa id-em {id_sastojka} je uspjesno izmijenjen"}), 200



@app.route("/api/sastojci/<id_sastojka>", methods=["DELETE"])
def obrisi_sastojak(id_sastojka):
    db = mysql.get_db()
    cursor = db.cursor()
    obrisano = cursor.execute("DELETE FROM sastojci WHERE id = %s", (id_sastojka,))
    db.commit()
    if obrisano > 0:
        return jsonify({"message": f"Sastojak sa id-em {id_sastojka} je uspjesno obrisan"}), 200
    return jsonify({"error": "Sastojak nije pronadjen"}), 404



if __name__ == '__main__':
    app.run(debug=True, port=5000)





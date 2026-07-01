export default {
    props: ['kategorije'],

    data() {
        return {
            jelo: { naziv: '', cijena: '', kategorija_id: '' },
            izmjena: false,
            idZaIzmjenu: null
        }
    },

    template: `
    <form @submit.prevent="sacuvaj()">
        <div>
            <label>Naziv:</label>
            <input v-model="jelo.naziv" type="text" required>
        </div>
        <div>
            <label>Cijena:</label>
            <input v-model="jelo.cijena" type="number" step="0.01" required>
        </div>
        <div>
            <label>Kategorija:</label>
            <select v-model="jelo.kategorija_id" required>
                <option value="">-- Izaberi kategoriju --</option>
                <option v-for="kategorija in kategorije" :key="kategorija.id" :value="kategorija.id">
                    {{ kategorija.naziv }}
                </option>
            </select>
        </div>
        <button type="submit">{{ izmjena ? 'Sacuvaj izmjene' : 'Dodaj jelo' }}</button>
        <button v-if="izmjena" type="button" @click="otkazi()">Otkazi</button>
    </form>
    `,

    methods: {
        popuniFormu(jelo) {
            this.jelo = { naziv: jelo.naziv, cijena: jelo.cijena, kategorija_id: jelo.kategorija_id };
            this.izmjena = true;
            this.idZaIzmjenu = jelo.id;
        },
        sacuvaj() {
            if (this.izmjena) {
                fetch('/api/jela/' + this.idZaIzmjenu, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.jelo)
                })
                .then(response => response.json())
                .then(() => {
                    this.$emit('osvjezi');
                    this.otkazi();
                });
            } else {
                fetch('/api/jela', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.jelo)
                })
                .then(response => response.json())
                .then(() => {
                    this.$emit('osvjezi');
                    this.jelo = { naziv: '', cijena: '', kategorija_id: '' };
                });
            }
        },
        otkazi() {
            this.jelo = { naziv: '', cijena: '', kategorija_id: '' };
            this.izmjena = false;
            this.idZaIzmjenu = null;
        }
    }
}
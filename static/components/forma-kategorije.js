export default {
    data() {
        return {
            kategorija: { naziv: '', opis: '' },
            izmjena: false,
            IdZaIzmjenu: null
        }
    },

    template: `
    <form @submit.prevent="sacuvaj()">
        <div>
            <label>Naziv:</label>
            <input v-model="kategorija.naziv" type="text" required>
        </div>
        <div>
            <label>Opis:</label>
            <input v-model="kategorija.opis" type="text">
        </div>
        <button type="submit">{{ izmjena ? 'Sacuvaj izmjene' : 'Dodaj kategoriju' }}</button>
        <button v-if="izmjena" type="button" @click="otkazi()">Otkazi</button>
    </form>
    `,

    methods: {
        popuniFormu(kategorija) {
            this.kategorija = { naziv: kategorija.naziv, opis: kategorija.opis };
            this.izmjena = true;
            this.IdZaIzmjenu = kategorija.id;
        },
        sacuvaj() {
            if (this.izmjena) {
                fetch('/api/kategorije/' + this.IdZaIzmjenu, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.kategorija)
                })
                .then(response => response.json())
                .then(() => {
                    this.$emit('osvjezi');
                    this.otkazi();
                });
            } else {
                fetch('/api/kategorije', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.kategorija)
                })
                .then(response => response.json())
                .then(() => {
                    this.$emit('osvjezi');
                    this.kategorija = { naziv: '', opis: '' };
                });
            }
        },
        otkazi() {
            this.kategorija = { naziv: '', opis: '' };
            this.izmjena = false;
            this.IdZaIzmjenu = null;
        }
    }
}
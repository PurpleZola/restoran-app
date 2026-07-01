export default {
    props: ['jela'],

    data() {
        return {
            sastojak: { naziv: '', jedinica_mjere: '', jelo_id: '' },
            izmjena: false,
            idZaIzmjenu: null
        }
    },

    template: `
    <form @submit.prevent="sacuvaj()">
        <div>
            <label>Naziv:</label>
            <input v-model="sastojak.naziv" type="text" required>
        </div>
        <div>
            <label>Jedinica:</label>
            <input v-model="sastojak.jedinica_mjere" type="text">
        </div>
        <div>
            <label>Jelo:</label>
            <select v-model="sastojak.jelo_id" required>
                <option value="">-- Izaberi jelo --</option>
                <option v-for="jelo in jela" :key="jelo.id" :value="jelo.id">
                    {{ jelo.naziv }}
                </option>
            </select>
        </div>
        <button type="submit">{{ izmjena ? 'Sacuvaj izmjene' : 'Dodaj sastojak' }}</button>
        <button v-if="izmjena" type="button" @click="otkazi()">Otkazi</button>
    </form>
    `,

    methods: {
        popuniFormu(sastojak) {
            this.sastojak = { naziv: sastojak.naziv, jedinica_mjere: sastojak.jedinica_mjere, jelo_id: sastojak.jelo_id };
            this.izmjena = true;
            this.idZaIzmjenu = sastojak.id;
        },
        sacuvaj() {
            if (this.izmjena) {
                fetch('/api/sastojci/' + this.idZaIzmjenu, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.sastojak)
                })
                .then(response => response.json())
                .then(() => {
                    this.$emit('osvjezi');
                    this.otkazi();
                });
            } else {
                fetch('/api/sastojci', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.sastojak)
                })
                .then(response => response.json())
                .then(() => {
                    this.$emit('osvjezi');
                    this.sastojak = { naziv: '', jedinica_mjere: '', jelo_id: '' };
                });
            }
        },
        otkazi() {
            this.sastojak = { naziv: '', jedinica_mjere: '', jelo_id: '' };
            this.izmjena = false;
            this.idZaIzmjenu = null;
        }
    }
}
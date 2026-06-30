export default {
    props: ['kategorije'],

    data() {
        return {
            jelo: { naziv: '', cijena: '', kategorija_id: '' }
        }
    },

    template: `
    <form @submit.prevent="dodaj()">
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
        <button type="submit">Dodaj jelo</button>
    </form>
    `,

    methods: {
        dodaj() {
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
    }
}
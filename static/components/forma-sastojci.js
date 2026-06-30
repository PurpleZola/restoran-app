export default {
    props: ['jela'],

    data() {
        return {
            sastojak: { naziv: '', jedinica_mjere: '', jelo_id: '' }
        }
    },

    template: `
    <form @submit.prevent="dodaj()">
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
        <button type="submit">Dodaj sastojak</button>
    </form>
    `,

    methods: {
        dodaj() {
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
    }
}
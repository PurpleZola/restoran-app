export default {
    props : ['kategorije'],

    data(){
        return {
            kategorija: { naziv: '', opis: '' }
        }
    },

    template: `
    <form @submit.prevent="dodaj()">
        <div>
            <label>Naziv:</label>
            <input v-model="kategorija.naziv" type="text" required>
        </div>
        <div>
            <label>Opis:</label>
            <input v-model="kategorija.opis" type="text">
        </div>
        <button type="submit">Dodaj kategoriju</button>
    </form>
    `,

    methods: {
        dodaj() {
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
    }

}
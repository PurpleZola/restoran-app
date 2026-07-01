export default {
    props: ['kategorije'],

    template: `
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Opis</th>
                <th>Akcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="kategorija in kategorije" :key="kategorija.id">
                <td>{{ kategorija.id }}</td>
                <td>{{ kategorija.naziv }}</td>
                <td>{{ kategorija.opis }}</td>
                <td>
                    <button @click="obrisi(kategorija.id)">Obrisi</button>
                    <button @click="$emit('izmijeni', kategorija)">Izmijeni</button>
                </td>
            </tr>
        </tbody>
    </table>
    `,

    methods: {
        obrisi(id) {
            fetch('/api/kategorije/' + id, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => {
                this.$emit('osvjezi');
            });
        }
    }
}
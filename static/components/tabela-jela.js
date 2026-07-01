export default {
    props: ['jela'],

    template: `
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Cijena</th>
                <th>Kategorija</th>
                <th>Akcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="jelo in jela" :key="jelo.id">
                <td>{{ jelo.id }}</td>
                <td>{{ jelo.naziv }}</td>
                <td>{{ jelo.cijena }} KM</td>
                <td>{{ jelo.kategorija_naziv }}</td>
                <td>
                    <button @click="obrisi(jelo.id)">Obrisi</button>
                    <button @click="$emit('izmijeni', jelo)">Izmijeni</button>
                </td>
            </tr>
        </tbody>
    </table>
    `,

    methods: {
        obrisi(id) {
            fetch('/api/jela/' + id, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => {
                this.$emit('osvjezi');
            });
        }
    }
}
export default {
    props: ['sastojci'],

    template: `
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Jedinica mjere</th>
                <th>Jelo</th>
                <th>Akcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="sastojak in sastojci" :key="sastojak.id">
                <td>{{ sastojak.id }}</td>
                <td>{{ sastojak.naziv }}</td>
                <td>{{ sastojak.jedinica_mjere }}</td>
                <td>{{ sastojak.jelo_naziv }}</td>
                <td>
                    <button @click="obrisi(sastojak.id)">Obrisi</button>
                    <button @click="$emit('izmijeni', sastojak)">Izmijeni</button>
                </td>
            </tr>
        </tbody>
    </table>
    `,

    methods: {
        obrisi(id) {
            fetch('/api/sastojci/' + id, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => {
                this.$emit('osvjezi');
            });
        }
    }
}
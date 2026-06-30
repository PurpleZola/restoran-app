import TabelaKategorije from './components/tabela-kategorije.js';
import FormaKategorije from './components/forma-kategorije.js';

const app = Vue.createApp({
    components: {
        'tabela-kategorije': TabelaKategorije,
        'forma-kategorije': FormaKategorije
    },

    data() {
        return {
            kategorije: []
        }
    },

    mounted() {
        this.ucitajKategorije();
    },

    methods: {
        ucitajKategorije() {
            fetch('/api/kategorije')
                .then(response => response.json())
                .then(data => {
                    this.kategorije = data;
                });
        }
    },

    template: `
    <h1>Restoran - Upravljanje menijem</h1>

    <h2>Kategorije</h2>
    <tabela-kategorije :kategorije="kategorije" @osvjezi="ucitajKategorije()"></tabela-kategorije>

    <h2>Dodaj kategoriju</h2>
    <forma-kategorije @osvjezi="ucitajKategorije()"></forma-kategorije>
    `
});

app.mount('#app');
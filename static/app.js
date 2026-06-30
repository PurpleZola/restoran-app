import TabelaKategorije from './components/tabela-kategorije.js';
import FormaKategorije from './components/forma-kategorije.js';
import TabelaJela from './components/tabela-jela.js';
import FormaJela from './components/forma-jela.js';

const app = Vue.createApp({
    components: {
        'tabela-kategorije': TabelaKategorije,
        'forma-kategorije': FormaKategorije,
        'tabela-jela': TabelaJela,
        'forma-jela': FormaJela
    },

    data() {
        return {
            kategorije: [],
            jela: []
        }
    },

    mounted() {
        this.ucitajKategorije();
        this.ucitajJela();
    },

    methods: {
        ucitajKategorije() {
            fetch('/api/kategorije')
                .then(response => response.json())
                .then(data => {
                    this.kategorije = data;
                });
        },
        ucitajJela() {
            fetch('/api/jela')
                .then(response => response.json())
                .then(data => {
                    this.jela = data;
                });
        }
    },

    template: `
    <h1>Restoran - Upravljanje menijem</h1>

    <h2>Kategorije</h2>
    <tabela-kategorije :kategorije="kategorije" @osvjezi="ucitajKategorije()"></tabela-kategorije>

    <h2>Dodaj kategoriju</h2>
    <forma-kategorije @osvjezi="ucitajKategorije()"></forma-kategorije>

    <h2>Jela</h2>
    <tabela-jela :jela="jela" @osvjezi="ucitajJela()"></tabela-jela>

    <h2>Dodaj jelo</h2>
    <forma-jela :kategorije="kategorije" @osvjezi="ucitajJela()"></forma-jela>
    `
});

app.mount('#app');
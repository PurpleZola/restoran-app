import TabelaKategorije from './components/tabela-kategorije.js';
import FormaKategorije from './components/forma-kategorije.js';
import TabelaJela from './components/tabela-jela.js';
import FormaJela from './components/forma-jela.js';
import TabelaSastojci from './components/tabela-sastojci.js';
import FormaSastojci from './components/forma-sastojci.js';

const app = Vue.createApp({
    components: {
        'tabela-kategorije': TabelaKategorije,
        'forma-kategorije': FormaKategorije,
        'tabela-jela': TabelaJela,
        'forma-jela': FormaJela,
        'tabela-sastojci': TabelaSastojci,
        'forma-sastojci': FormaSastojci
    },

    data() {
        return {
            kategorije: [],
            jela: [],
            sastojci: []
        }
    },

    mounted() {
        this.ucitajKategorije();
        this.ucitajJela();
        this.ucitajSastojke();
    },

    methods: {
        ucitajKategorije() {
            fetch('/api/kategorije')
                .then(response => response.json())
                .then(data => { this.kategorije = data; });
        },
        ucitajJela() {
            fetch('/api/jela')
                .then(response => response.json())
                .then(data => { this.jela = data; });
        },
        ucitajSastojke() {
            fetch('/api/sastojci')
                .then(response => response.json())
                .then(data => { this.sastojci = data; });
        }
    },

    template: `
    <h1>Restoran - Upravljanje menijem</h1>

    <h2>Kategorije</h2>
    <tabela-kategorije 
        :kategorije="kategorije" 
        @osvjezi="ucitajKategorije()" 
        @izmijeni="$refs.formaKategorije.popuniFormu($event)">
    </tabela-kategorije>
    <h2>Dodaj kategoriju</h2>
    <forma-kategorije 
        ref="formaKategorije"
        @osvjezi="ucitajKategorije()">
    </forma-kategorije>

    <h2>Jela</h2>
    <tabela-jela 
        :jela="jela" 
        @osvjezi="ucitajJela()" 
        @izmijeni="$refs.formaJela.popuniFormu($event)">
    </tabela-jela>
    <h2>Dodaj jelo</h2>
    <forma-jela 
        ref="formaJela"
        :kategorije="kategorije"
        @osvjezi="ucitajJela()">
    </forma-jela>

    <h2>Sastojci</h2>
    <tabela-sastojci 
        :sastojci="sastojci" 
        @osvjezi="ucitajSastojke()" 
        @izmijeni="$refs.formaSastojci.popuniFormu($event)">
    </tabela-sastojci>
    <h2>Dodaj sastojak</h2>
        <forma-sastojci 
        ref="formaSastojci"
        :jela="jela"
        @osvjezi="ucitajSastojke()">
    </forma-sastojci>
    `
});

app.mount('#app');
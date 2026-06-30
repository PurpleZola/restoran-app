const app = Vue.createApp({
    data(){
        return {
            kategorije: []
        }
    },
    mounted(){
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
    }

});

app.mount('#app');
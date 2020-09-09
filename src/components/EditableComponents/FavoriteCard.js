
let t = `<q-scroll-area
style="height: 500px; width: 100%;"
class="bg-grey-1 rounded-borders"
>
<div class='text-h2 text-primary'> Your Favorite Items: </div>
<q-separator/>
<div style=''>
    <ProductCard
        v-for='item in items'
        v-bind:key= item.Code
        v-bind = item
        style='width:45%;display:inline-block; margin:5px;'
    />
</div>
</q-scroll-area>`;



module.exports.init = function (Vue,store){
    let st = store.state.editableComponents[0].FavoriteCard;
    const q = require ('quasar');
    Vue.component('FavoriteCard', {
        template: st || t,
        components: {...q},
        name: 'FavoriteCard',
        data () {
            return {
                favs: [],
                items: []
            };
        },
        methods: {
            loadItems: function(){
                this.items = [];
                this.favs = Object.keys(localStorage).filter(r => r.startsWith('fav') && localStorage.getItem(r) == 1);
                for (let f of this.favs){
                    f = f.replace('fav', ''); //favCODIGO para diferencia
                    this.items.push(this.$store.state.items.find(r => r.Code === f));
                }
            }
        },
        mounted () {
            let self = this;
            this.loadItems();
            this.$bus.$on('newFav', self.loadItems);
            // console.log(this.items);
        }

    });
};
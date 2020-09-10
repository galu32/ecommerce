
let t = `<q-card style='' to='/'>
    <q-card-section horizontal>
        <router-link :to=getPath() style = ' width: 100%;'>
            <q-img
                style="height: 200px ; object-fit: cover;"
                :src='Image'
            />
        </router-link>
        <q-card-actions vertical class="justify-around">
            <q-btn flat round :color='fav ? "red" : "grey"' icon="favorite" @click='storeFav'/>
            <q-btn flat round color="grey" icon="share" />
            <q-btn flat round color="grey" icon="add_shopping_cart" @click='addCartItem'/>
        </q-card-actions>
    </q-card-section>
    <q-tooltip
    transition-show="flip-right"
    transition-hide="flip-left"
  >
  <span style='margin-top:20px;'class="label text-white"> {{Name}} </span>
  </q-tooltip>
</q-card>`;



module.exports.init = function (Vue, store){
    let st = store.state.editableComponents[0].ProductCard;
    const q = require ('quasar');
    Vue.component('ProductCard', {
        template: st || t,
        components: {...q},
        props: {
            Image: {
                type: String,
                default: "https://cdn.quasar.dev/img/parallax2.jpg"
            },
            Code: {
                type: String,
                // required: true,
                default: ''
            },
            Name: {
                type: String,
                // required: true,
                default: 'Test Card'
            },
            HomaPage: {
                type: Boolean,
                default: false,
            },
        
        },
        name: 'ProductCard',
        data () {
            return {
                fav: false,
            };
        },
        methods: {
            storeFav: function () {
                if (!this.Code) return;
                let favs = localStorage;
                let v = favs.getItem('fav'+this.Code);
                let value;
                if (typeof v !== 'string'){
                    value = 1;
                }
                else {
                    if (v == '0') value = 1;
                    if (v == '1') value = 0;
                }
                favs.setItem('fav'+this.Code, value);
                this.fav = value;
                this.$bus.$emit('newFav');
            },
            checkIfFav: function () {
                this.fav = parseInt(localStorage.getItem('fav'+this.Code));
            },
            getPath: function () {
                if (!this.Code) return '';
                return '/item/' + this.Code;
            },
            addCartItem: function () {
                let v;
                if (!localStorage.getItem('cart'+this.Code)) v = 0;
                else v = localStorage.getItem('cart'+this.Code);
                localStorage.setItem('cart'+this.Code, parseInt(v) + 1);
                this.$bus.$emit('newCart');
            }
        },
        mounted () {
            if (!this.Code) return;
            let self = this;
            this.checkIfFav();
            this.$bus.$on('newFav', self.checkIfFav);
        }

    });
};

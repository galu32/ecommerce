
let t = `<q-card style = 'display:inline-block; width: 35%; margin-top: 30px; height:650px;' >
<div class='text-h3 text-primary' style='margin:15px'> {{Name}} </div>
<q-separator />
    <q-scroll-area
    vertical
    style="height: 550px; width: 100%; "
    class="bg-grey-1 rounded-borders"
    >
    <div class='text-h5 text-grey' style='margin:15px;'> {{Description}} </div>
</q-scroll-area>
    <q-separator />
<div class="q-pa-md" style = 'width:50%; display: inline-block; padding: 10px'>
    <q-input
        v-model.number="Qty"
        type="number"
        min=1
        filled
        style="max-width: 100px"
    />
    <q-btn flat round color="grey" icon="add_shopping_cart" @click='addItemCart'/>
    <q-btn flat round :color='fav ? "red" : "grey"' icon="favorite" @click='addFavorite'/>
</div>
<div style = ' display:inline-block; margin: 20px; text-align: right;' class='float-right text-primary text-h5 '>
            <span class="label bg-primary text-white">$ {{CurrentPrice}}</span>
</div>
</q-card>`;



module.exports.init = function (Vue, store){
    let st = store.state.editableComponents[0].ItemCard;
    const q = require ('quasar');
    Vue.component('ItemCard', {
        template: st || t,
        components: {...q},
        props: {
            Image: {
                type: String,
                default: 'https://cdn.quasar.dev/img/parallax2.jpg'
            },
            Name: {
                type: String,
                default: "TEST"
            },
            Description: {
                type: String,
                // required: true,
                default: 'TEST-TEST-TEST-TEST'
            },
            Price: {
                type: Number,
                // required: true,
                default: 0
            },
            Code: {
                type: String,
                default: ""
            },
        
        },
        name: 'ItemCard',
        data () {
            return {
                Qty: 1,
                fav: false,
                CurrentPrice: this.Price,
            };
        },
        methods: {
            addItemCart: function () {
                if (!this.Qty) return;
                let v = localStorage.getItem('cart'+this.Code);
                if (!v) {
                    localStorage.setItem('cart'+this.Code, this.Qty);
                }else{
                    v = parseInt(v);
                    localStorage.setItem('cart'+this.Code, this.Qty + v);
                }
                this.$bus.$emit('newCart', this.Qty);
                this.Qty = 1;
                this.CurrentPrice = this.Price;
            },
            addFavorite: function () {
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
        },
        watch: {
            Qty: function(nv,ov){
                if (nv > ov) this.CurrentPrice += this.Price;
                if (nv < ov) this.CurrentPrice -= this.Price;
            }
        },
        mounted () {
            this.fav = parseInt(localStorage.getItem('fav'+this.Code));
        }

    });
};
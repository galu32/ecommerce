
let t = `<q-card style = 'display:inline-block; width: 35%; margin-top: 30px'>
<div class='text-h3 text-primary'> {{Name}} </div>
<q-separator />
<div class='text-h5 text-grey'> {{Description}} </div>
<q-separator />
<div class="q-pa-md" style = 'width:25%; display: inline-block; padding: 10px'>
    <q-input
        v-model.number="Qty"
        type="number"
        filled
        style="max-width: 200px"
    />
</div>
<div style = ' display: inline-block; padding: 10px'>
    <q-btn flat round color="grey" icon="add_shopping_cart" @click='addItemCart'/>
</div>
<div style = ' float: right; padding: 10px' class ='text-h3 text-primary'>
   $ {{Price}}
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
                Qty: 0
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
                this.Qty = 0;
            }
        },
        mounted () {
        }

    });
};
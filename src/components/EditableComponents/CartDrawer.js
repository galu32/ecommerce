
let t = `
<q-list>
<div v-if='showCart'>
    <div class='text-h5 text-primary' style='margin: 5px;'> Your Current Cart: </div>
    <q-separator />
    <div
    v-for='i in items'
    v-bind:key='i.Code'
    >
        <CheckOutItem
        v-bind= 'i'
        :disable = 'PayMode ? true:false'
        />
        <q-separator />
    </div>
</div>
<div v-if='showFields'>
<div class='text-h5 text-primary' style='margin: 5px;'> Finish your checkout: </div>
    <q-separator/>
        <div
        style = 'width:50%; display: inline-block; padding: 10px'
        v-for='f in Fields.filter(r => r.type !== "component")'
        v-bind:key = f.field>
            <component :is="f.type" v-bind='f' v-model='f.value' style = ''/>
        </div>
</div>

<q-footer reveal elevated>
<div class="container" style='height:150px;'>
            <span class=" float-left label bg-primary text-white">Sub total (w/d): </span>
            <span class=" float-right label bg-primary text-white">$ {{1.50}} </span>
            <br>
            <span class=" float-left label bg-primary text-white">Ship Total: </span>
            <span class="float-right label bg-primary text-white">$ {{ShipCost}} </span>
            <br>
            <span class=" float-left label bg-primary text-white">Total: </span>
            <span class=" float-right label bg-primary text-white">$ {{Total.toFixed(2)}} </span>
            <br>
            <br>
            <q-btn v-if='!PayMode && showCart && !showFields' color="white" label="Check-Out" @click="checkout" text-color='primary' style='width:80%;margin:0px;' />
            <q-btn v-if='!PayMode && !showCart && showFields' color="white" label="Check-Out" @click="finishCheckoutProcess" text-color='primary' style='width:80%;margin:0px;' />
            <q-btn v-if='PayMode && showCart && !showFields' color="white" label="Pay Me!" @click="processPayment" text-color='primary' style='width:80%;margin:0px;' />
</div>
</q-footer>
</q-list>
`;

let _ = require('lodash');

module.exports.init = function (Vue,store){
    let st = store.state.editableComponents[0].CartDrawer;
    const q = require ('quasar');
    Vue.component('CartDrawer', {
        template: st || t,
        components: {...q},
        name: 'CartDrawer',
        props: {
            open : {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                items: [],
                Total: 0,
                coupon: '',
                showCart: true,
                showFields: false,
                Fields: [],
                ShipCost: 0,
                PayMode: null
            };
        },
        methods: {
            load: function () {
                let i = Object.keys(localStorage).filter(r => r.startsWith('cart'));
                this.items = this.$store.state.items.filter(r => i.includes('cart'+r.Code));
                this.Total = _.sumBy(this.items, r => {
                    if (!r.Price) return 0;
                    else return r.Price * parseInt(localStorage.getItem('cart'+r.Code));
                });
            },
            checkout: async function () {
                if (!this.checkIfLoged()) return;
                this.showCart = false;
                this.showFields = true;
                this.loadFields();
                this.loadValues();
            },
            checkIfLoged: function (){
                if (!this.$store.state.user){
                    this.$bus.$emit('openModal', "register");
                    this.showFields = false;
                    this.PayMode = null;
                    this.showCart = true;
                    return this.$errorResponse('Need to be loged');
                }
                return true;
            },
            loadFields: function () {
                this.Fields = [];
                let Fields = this.$models.User.getCheckoutShipFields();
                this.Fields = Object.keys(Fields).filter(f => !Fields[f].internal)
                    .map(f => {
                        let i = {
                            field: f,
                            value: undefined,
                            readonly: Fields[f].readonly || false,
                            required: Fields[f].required,
                            linkto: Fields[f].linkto,
                            type: Fields[f].type
                        };
                        if (i.type === 'set') i.multiple = false;
                        return i;
                    });
            },
            loadValues: function () {
                let d = this.$store.state.user;
                for (let f of this.Fields){
                    f.value = d[f.field];
                }
            },
            finishCheckoutProcess: function () {
                for (let f of this.Fields)
                    if (!f.value && f.value !== 0) return this.$errorResponse('Required field ' + f.field);
                this.showFields = false;
                this.showCart = true;
                let sc = this.Fields.find(r => r.field === 'ShipMethods');
                sc = this.$store.state.shipmethods.find(r => r.Code === sc.value);
                this.ShipCost = sc.Total;
                let pm = this.Fields.find(r => r.field === 'PayMethods');
                pm = this.$store.state.paymethods.find(r => r.Code === pm.value);
                this.PayMode = pm;
            },
            processPayment: async function () {
                if (!this.checkIfLoged()) return;
                let items = this.items.map(r => ({unit_price:r.Price, title:r.Name, quantity: parseInt(localStorage.getItem('cart'+r.Code))}));
                if (this.ShipCost) items.push({unit_price: this.ShipCost, title: 'ENVIO', quantity: 1});
                let res = await this.$axios.post('/genOrder', {items});
                if (res.data.status) window.open(res.data.res.init_point, '_blank');
                else return this.$errorResponse('Error');

            },
        },
        watch : {
        },
        mounted() {
            let self = this;
            this.load();
            this.$bus.$on('newCart', self.load);
        }
    });
};
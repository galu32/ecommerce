
let t = `
<q-scroll-area
style="height: 500px; width: 100%;"
class="bg-grey-1 rounded-borders"
>
<div v-if = '!finishCheckout'>
    <div class='text-h2 text-primary'> Your Current Cart: </div>
    <q-list bordered class="rounded-borders" style="max-width: 600px">
        <CheckOutItem
        v-for='i in items'
        v-bind:key='i.Code'
        v-bind='i'
        :disable = 'paymentCheckout'
        />


        <q-item v-if='!paymentCheckout'>
            <q-item-section top>
                <q-item-label lines="1">
                    <span class="text-weight-medium text-primary">Discount Coupon</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    Add here your discount code
                </q-item-label>
            </q-item-section>

            <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                    <q-input
                        v-model="coupon"
                        type="text"
                        filled
                        :disable = 'appCoupon ? true : false'
                        style="max-width: 300px; display: inline-block;"
                    />
                    <q-btn class="gt-xs" size="12px" flat dense round icon="check" @click='applyCoupon' />
                </div>
            </q-item-section>
        </q-item>
    <div v-if='!paymentCheckout'>
        <div class='text-h4 text-primary align-right' style='display:inline-block;'> Your total: {{Total}}</div>
        <q-btn color="primary" style='display:inline-block;' label="Check-Out" @click="checkout" />
    </div>
    <div v-else>
        <div class='text-h3 text-primary align-right' style=''> Sub total (w/d): $ {{Total}}</div>
        <div class='text-h3 text-primary align-right' style=''> Ship total     : $ {{ShipCost}}</div>
        <div class='text-h3 text-primary align-right' style=''> Total          : $ {{ShipCost + Total}}</div>
        <q-separator/>
        <div v-if='!PayMode.Online' class='text-h5 text-primary align-right' style=''>Selected offline pay method so seller will contact you son...
        <q-btn color="primary" style='' label="Send Order" @click="sendOrder" /></div>
        <q-btn v-else color="primary" style='' label="Pay me!" @click="processPayment" />
    </div>
    </q-list>
</div>
<div v-else>
    <div class='text-h2 text-primary'> Finish your checkout: </div>
    <q-separator/>
    <div
    style = 'width:50%; display: inline-block; padding: 10px'
    v-for='f in Fields.filter(r => r.type !== "component")'
    v-bind:key = f.field>
    <q-input
        v-if = 'f.type !== "boolean" && f.type !== "set" && f.type !== "component"'
        v-bind:hint = f.field
        v-bind:readonly = f.readonly
        v-bind:type = f.type
        class = ''
        :mask= "f.type === 'value' ? '#.##' : '' "
        :fill-mask= "f.type === 'value' ? false : '' "
        square filled v-model="f.value" />
    <q-select
        v-if = 'f.type === "set"'
        filled
        quare
        v-model= "f.value"
        :options='f.linkto ? $store.state[f.linkto.toLowerCase()].map(r => r.Code) : []'
        stack-label
        :label=f.field
    />
    <q-checkbox
        v-if = 'f.type === "boolean"'
        v-bind:label = f.field
        class = 'text-primary'
        left-label
        v-model = "f.value"
    />
</div>
<div 
    v-for = 'f in Fields.filter(r => r.type === "component")'
    v-bind:key = f.field
    style = 'width:50%; display: inline-block; padding: 10px;'
>
    <component :is="'Field' + f.field" :value='f.value' style = ''></component>
</div>
<q-btn color="primary" style='display:inline-block;' label="Finish Check-Out" @click="finishCheckoutProcess" />
</div>
</q-scroll-area>`;

let _ = require('lodash');

module.exports.init = function (Vue,store){
    let st = store.state.editableComponents[0].CartModal;
    const q = require ('quasar');
    Vue.component('CartModal', {
        template: st || t,
        components: {...q},
        name: 'CartModal',
        data () {
            return {
                items: [],
                coupon: '',
                appCoupon: false,
                Total: 0,
                finishCheckout: false,
                paymentCheckout: false,
                Fields: [],
                ShipCost: 0,
                PayMode: null,
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
            applyCoupon: function () {
                let c = this.$store.state.coupons.find( r => r.Code === this.coupon);
                if (c) this.appCoupon = c;
                else this.$errorResponse('Invalid Coupon');
                this.Total = this.appCoupon ? this.Total - this.appCoupon.Value : this.Total;
            },
            checkout: async function () {
                if (!this.$store.state.user){
                    this.$bus.$emit('openModal', "register");
                    return this.$errorResponse('Need to be loged');
                }
                this.finishCheckout = true;
                this.loadFields();
                this.loadValues();
            },
            loadFields: function () {
                this.Fields = [];
                let Fields = this.$models.User.getCheckoutShipFields();
                this.Fields = Object.keys(Fields).filter(f => !Fields[f].internal && f !== 'Admin')
                    .map(f => {
                        let i = {field:f, value:undefined, readonly: Fields[f].readonly, required: Fields[f].required, linkto: Fields[f].linkto };
                        if (Fields[f].type === 'integer' || Fields[f].type === 'value')
                            i.type = 'number';
                        else if (Fields[f].type === 'string')
                            i.type = 'text';
                        else if (Fields[f].type === 'boolean')
                            i.value = false;
                        if (!i.type)
                            i.type = Fields[f].type;
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
                this.finishCheckout = false;
                this.paymentCheckout = true;
                let sc = this.Fields.find(r => r.field === 'ShipMethods');
                sc = this.$store.state.shipmethods.find(r => r.Code === sc.value);
                this.ShipCost = sc.Total;
                let pm = this.Fields.find(r => r.field === 'PayMethods');
                pm = this.$store.state.paymethods.find(r => r.Code === pm.value);
                this.PayMode = pm;
            },
            processPayment: async function () {
                let items = this.items.map(r => ({unit_price:r.Price, title:r.Name, quantity: parseInt(localStorage.getItem('cart'+r.Code))}));
                let res = await this.$axios.post('/genOrder', {items});
                if (res.data.status) window.open(res.data.res.init_point, '_blank');
                else return this.$errorResponse('Error');

            },
            sendOrder: function () {

            }
        },
        watch : {
        },
        mounted () {
            let self = this;
            this.load();
            this.$bus.$on('newCart', self.load);
        }
    });
};
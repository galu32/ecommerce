
let t = `
<q-scroll-area
style="height: 500px; width: 100%;"
class="bg-grey-1 rounded-borders"
>
    <div class='text-h2 text-primary'> Your Current Cart: </div>
    <q-list bordered class="rounded-borders" style="max-width: 600px">
        <CheckOutItem
        v-for='i in items'
        v-bind:key='i.Code'
        v-bind='i'
        />


        <q-item>
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

        <div class='text-h4 text-primary align-right' style='display:inline-block;'> Your total: {{appCoupon ? Total - appCoupon.Value : Total}}</div>
        <q-btn color="primary" style='display:inline-block;' label="Check-Out" @click="1" />

    </q-list>

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
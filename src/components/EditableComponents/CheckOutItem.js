let t = `
<q-item>
<q-item-section avatar top>
  <q-avatar>
      <img :src=Image>
  </q-avatar>
</q-item-section>

<q-item-section top>
  <q-item-label lines="1">
    <span class="text-weight-medium text-primary">{{Name}}</span>
  </q-item-label>
  <q-item-label caption lines="1">
    {{Description}}
  </q-item-label>
</q-item-section>

<q-item-section top side>
  <div class="text-grey-8 q-gutter-xs">
      <q-input
          :disable = 'disable'
          v-model.number="Qty"
          type="number"
          filled
          style="max-width: 50px; display: inline-block;"
      />
    <q-btn v-if='!disable' class="gt-xs" size="12px" flat dense round icon="delete" @click='deleteCart' />
  </div>
</q-item-section>
</q-item>
`;
module.exports.init = function (Vue,store){
    let st = store.state.editableComponents[0].CheckOutItem;
    const q = require ('quasar');
    Vue.component('CheckOutItem', {
        template: st || t,
        components: {...q},
        name: 'CheckOutItem',
        props: {
            Image: {
                type: String,
                default : 'https://cdn.quasar.dev/img/avatar.png'
            },

            Description: {
                type: String,
                default: 'TEST LINK'
            },

            Link: {
                type: String,
                default: '#'
            },

            Name: {
                type: String,
                default: 'TEST'
            },
            Code: {
                type: String,
                default : '',
            },
            disable: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                Qty: 0
            };
        },
        mounted() {
            let self = this;
            this.$bus.$on('newCart', self.getQty);
            this.getQty();
        },
        watch : {
            Qty: function (newv,oldv) {
                let self = this;
                if (oldv === 0) return;
                localStorage.setItem('cart'+this.Code, parseInt(newv));
                this.$bus.$emit('newCart');
            }
        },
        methods: {
            deleteCart: function () {
                if (this.disable) return;
                localStorage.removeItem('cart'+this.Code);
                this.$bus.$emit('newCart');
            },
            getQty: function () {
                let self = this;
                let i = Object.keys(localStorage).find(r => 
                    r.startsWith('cart') && r.replace('cart','') === self.Code
                );
                this.Qty = parseInt(localStorage.getItem(i));
            },
        }
    });
};
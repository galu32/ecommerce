<template>
    <q-scroll-area
        style="height: 85vh; width: 100%;"
        class="bg-grey-1 rounded-borders">
        <q-page class="flex-center" v-if='Item'>
            <q-img
                style="height: 40vh ; width:60%; margin:30px;"
                :src='Item.Image'
            />
            <q-card style = 'display:inline-block; width: 35%; margin-top: 30px'>
                <div class='text-h3 text-primary'> {{Item.Name}} </div>
                <q-separator />
                <div class='text-h5 text-grey'> {{Item.Description}} </div>
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
                    ${{Item.Price}}
                </div>
            </q-card>
        </q-page>
    </q-scroll-area>
</template>
<script>
export default {
    name: 'Item',
    components: {},
    props: {
    },
    data () {
        return {
            Item: null,
            Qty: 0,
        };
    },
    async mounted () {
        this.getItem();
    },
    methods: {
        getItem: function () {
            this.Item = this.$store.state.items.find(r => r.Code === this.$route.params.code);
        },
        addItemCart: function () {
            if (!this.Qty) return;
            let v = localStorage.getItem('cart'+this.Item.Code);
            if (!v) {
                localStorage.setItem('cart'+this.Item.Code, this.Qty);
            }else{
                v = parseInt(v);
                localStorage.setItem('cart'+this.Item.Code, this.Qty + v);
            }
            this.$bus.$emit('newCart');
            this.Qty = 0;
        }
    }
};
</script>

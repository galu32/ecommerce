let t = 
`
    <div class="q-pa-md">
<q-item-label
    header
    class="text-grey text-center"
    style="font-size: 25px"
>
    {{title}}
    </q-item-label>
<q-separator />
        <q-scroll-area
            horizontal
            style="height: 300px; width: 100%;"
            class="bg-grey-1 rounded-borders"
        >
            <div class="row no-wrap" style='margin-top:30px;'>
                <!-- <div v-for="n in 10" :key="n" style="width: 150px" class="q-pa-sm"> -->
                <ProductCard 
                    v-for='item in MainProdcuts'
                    v-bind:key= item.Code
                    v-bind = item
                    style="width: 300px ; margin: 10px" class="q-pa-sm"/>
            </div>
            <!-- </div> -->
        </q-scroll-area>
    </div>
`;

module.exports.init = function (Vue,store){
    let st = store.state.editableComponents[0].MainItems;
    const q = require ('quasar');
    Vue.component('MainItems', {
        template: st || t,
        components: {...q},
        name: 'MainItems',
        props: {
        },
        data() {
            return {
                MainProdcuts : [],
                title: "",
            };
        },
        mounted() {
            this.MainProdcuts = this.$store.state.items.filter(r => r.HomePage);
            this.title = "Ofertas (" + this.MainProdcuts.length + ")";
        }
    });
};
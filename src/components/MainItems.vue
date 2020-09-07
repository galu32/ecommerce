<template>
    <q-card>
        <q-item-label
            header
            class="text-grey text-center"
            style="font-size: 25px"
        >
            {{title}}
        </q-item-label>
        <q-separator />
        <q-card-section class="q-pa-md">
            <div class="q-pa-md">
                <q-scroll-area
                    horizontal
                    style="height: 270px; width: 100%;"
                    class="bg-grey-1 rounded-borders"
                >
                    <div class="row no-wrap">
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
        </q-card-section>
    </q-card>
</template>

<script>

export default {
    
    name: 'MainItems',
    props: {
        title: {
            type: String,
            default: "Ofertas de la semana"
        }
    },
    data () {
        return {
            MainProdcuts : [],
        };
    },
    mounted () {
        this.MainProdcuts = this.$store.state.items.filter(r => r.HomePage);
    }
};
</script>

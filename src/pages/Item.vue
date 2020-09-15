<template>
    <q-page class="flex-center" v-if='Item'>
        <!-- <q-scroll-area
            style="height: 85vh; width: 100%;"
            class="bg-grey-1 rounded-borders"> -->
        <div class='row' style=''>
            <q-carousel
                v-model="slide"
                transition-prev="scale"
                transition-next="scale"
                swipeable
                animated
                control-color="white"
                navigation
                arrows
                style='width:60%;margin:30px;'
                height="73vh"
                class="bg-white text-white shadow-1 rounded-borders"
            >
                <q-carousel-slide 
                    v-for = 'i in Images'
                    :key = 'i'
                    :name='i' class="column no-wrap flex-center">
                    <q-img :src='i' style='width:100%'/>
                </q-carousel-slide>
            </q-carousel>
            <!-- <q-img
            style="height: 73vh ; width:60%; margin:30px;"
            :src='Item.Image'
        /> -->
            <ItemCard v-bind=Item style='width:35%;'/>
        </div>
        <!-- </q-scroll-area> -->
    </q-page>
</template>
<script>
export default {
    name: 'Item',
    components: {},
    props: {
    },
    data() {
        return {
            Item: null,
            slide: '',
            Images: []
        };
    },
    async mounted() {
        this.getItem();
        this.Images = this.Item.Image.split(',');
        this.slide = this.Images[0];
    },
    watch: {
        '$route.params.code': function (nv) {
            this.getItem();
        },
    },
    methods: {
        getItem: function () {
            this.Item = this.$store.state.items.find(r => r.Code === this.$route.params.code);
        }
    }
};
</script>

<template>
    <q-page class="flex-center">
        <!-- <q-img :src=HomeOptions.HeaderImage style='height: 430px; margin-top:15px;' /> -->
        <div class="q-pa-md">
            <div class="q-gutter-md">
                <q-carousel
                    ref = 'carousel'
                    v-model="slide"
                    transition-prev="scale"
                    transition-next="scale"
                    swipeable
                    animated
                    control-color="white"
                    navigation
                    arrows
                    height="430px"
                    class="bg-primary text-white shadow-1 rounded-borders"
                >
                    <q-carousel-slide 
                        v-for='i in images'
                        :key = 'i'
                        :name="i" class="column no-wrap flex-center">
                        <q-img :src='i' style='width:100%'/>
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </div>

        <MainItems/>
        <!-- <q-separator /> -->
        <!-- <q-img :src=HeaderImage style='height: 400px' />
            <MainItems/> -->
        <!-- </q-scroll-area> -->
        <q-page-sticky v-if='HomeOptions.ShowContactButton' position="bottom-right" :offset="[30, -55]">
            <q-btn fab icon='mdi-whatsapp' color="primary" />
        </q-page-sticky>
    </q-page>

</template>
<script>
// import MainFooter from 'components/MainFooter.vue';
export default {
    name: 'PageIndex',
    // components: {MainFooter},
    props: {
        // HeaderImage: {
        //     type: String,
        //     default: 'https://cdn.quasar.dev/img/parallax2.jpg'
        // }
    },
    data() {
        return {
            HomeOptions: {},
            slide: '',
            images: [],
            lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
 
            // Inited: false
        };
    },
    async mounted() {
        this.HomeOptions = this.$store.state.home[0];
        // this.slide = this.HomeOptions.HeaderImage ? this.HomeOptions.HeaderImage.split(",")[0] : '';
        this.images = this.HomeOptions.HeaderImage ? this.HomeOptions.HeaderImage.split(",") : [];
        let self = this;
        if (this.images.length){
            setInterval(() => self.autoSlide(), 5000);
            this.slide = this.images[0];
        }
    
    },
    methods: {
        autoSlide: function () {
            if (this.images[this.images.length - 1] === this.slide) this.slide = this.images[0];
            else this.$refs.carousel.next();
        }
    }
};
</script>

<style>
</style>

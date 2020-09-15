<template>
    <q-page class="flex-center">
        <!-- <q-img :src=HomeOptions.HeaderImage style='height: 430px; margin-top:15px;' /> -->
        <div class="q-pa-md">
            <div class="q-gutter-md">
                <q-carousel
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
                    <q-carousel-slide name="style" class="column no-wrap flex-center">
                        <q-img :src=HomeOptions.HeaderImage style='width:100%'/>
                    </q-carousel-slide>
                    <q-carousel-slide name="3" class="column no-wrap flex-center">
                        <q-img :src=HomeOptions.HeaderImage style='width:100%'/>
                    </q-carousel-slide>
                    <q-carousel-slide name="2" class="column no-wrap flex-center">
                        <q-img :src=HomeOptions.HeaderImage style='width:100%'/>
                    </q-carousel-slide>
                    <q-carousel-slide name="1" class="column no-wrap flex-center">
                        <q-img :src=HomeOptions.HeaderImage style='width:100%'/>
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </div>

        <MainItems style='padding:15px;'/>
        <q-separator />
        <!-- <q-img :src=HeaderImage style='height: 400px' />
            <MainItems/> -->
        <!-- </q-scroll-area> -->
        <q-page-sticky v-if='HomeOptions.ShowContactButton' position="bottom-right" style='margin:10px;' :offset="[18, 18]">
            <q-btn fab icon='mail' color="primary" />
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
            slide: 'style',
            lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
 
            // Inited: false
        };
    },
    async mounted() {
        this.HomeOptions = this.$store.state.home[0];
        let self = this;
        // setTimeout(() =>  self.Inited = true, 3000);
        // let q = this.$query;
        // q = await q.select(["*"]).from('Item').fetch()
        // this.$resourcecs = await this.$axios.post('/fetch_resources')
    
    }
};
</script>

<template>
    <q-page class="flex-center">
        <!-- <q-scroll-area
            style="height: 85vh; width: 100%;"
            class="bg-grey-1 rounded-borders"> -->
        <q-img :src=HomeOptions.HeaderImage style='height: 430px; ' />
        <MainItems />
        <!-- <q-img :src=HeaderImage style='height: 400px' />
            <MainItems/> -->
        <!-- </q-scroll-area> -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="phone" color="primary" />
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
    data () {
        return {
            HomeOptions: {},
        };
    },
    async mounted () {
        this.HomeOptions = this.$store.state.home[0];
        // let q = this.$query;
        // q = await q.select(["*"]).from('Item').fetch()
        // this.$resourcecs = await this.$axios.post('/fetch_resources')
    
    }
};
</script>

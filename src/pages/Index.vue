<template>
    <q-page class="flex-center">
        <!-- <q-scroll-area
            style="height: 85vh; width: 100%;"
            class="bg-grey-1 rounded-borders"> -->
        <q-img :src=HomeOptions.HeaderImage style='height: 430px; margin-top:15px;' />
        <!-- <q-skeleton width="100%" height="430px" /> -->

        <MainItems style='padding:15px;'/>
        <q-separator />
        <!-- <q-img :src=HeaderImage style='height: 400px' />
            <MainItems/> -->
        <!-- </q-scroll-area> -->
        <q-page-sticky position="bottom-right" style='margin:10px;' :offset="[18, 18]">
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

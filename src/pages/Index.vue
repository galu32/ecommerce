<template>
    <q-scroll-area
        style="height: 85vh; width: 100%;"
        class="bg-grey-1 rounded-borders">
        <q-page class="flex-center">
            <q-img :src=HomeOptions.HeaderImage style='height: 500px; ' />
            <MainItems/>
            <!-- <q-img :src=HeaderImage style='height: 400px' />
            <MainItems/> -->
        </q-page>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="phone" color="primary" />
        </q-page-sticky>
    </q-scroll-area>
</template>
<script>
import MainItems from 'components/MainItems.vue';

export default {
    name: 'PageIndex',
    components: {MainItems},
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

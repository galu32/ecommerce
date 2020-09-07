<template>
    <q-scroll-area
        style="height: 85vh; width: 100%;"
        class="bg-grey-1 rounded-borders">
        <q-page class="flex-center">
            <!-- <q-img :src=HeaderImage style='height: 400px' />
            <MainItems/> -->
            <ItemsGrid />
        </q-page>
    </q-scroll-area>
</template>
<script>
import ItemsGrid from 'components/ItemsGrid.vue';
export default {
    name: 'Items',
    components: {ItemsGrid},
    props: {
    },
    data () {
        return {
        };
    },
    async mounted () {
    }
};
</script>

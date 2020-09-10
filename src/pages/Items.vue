<template>
    <q-page class="flex-center">
        <!-- <q-img :src=HeaderImage style='height: 400px' />
            <MainItems/> -->
        <ItemsGrid />
    </q-page>
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

<template>
    <q-scroll-area
        style="height: 85vh; width: 100%;"
        class="bg-grey-1 rounded-borders">
        <q-page class="flex-center" v-if='Item'>
            <q-img
                style="height: 40vh ; width:60%; margin:30px;"
                :src='Item.Image'
            />
            <ItemCard v-bind=Item />
        </q-page>
    </q-scroll-area>
</template>
<script>
export default {
    name: 'Item',
    components: {},
    props: {
    },
    data () {
        return {
            Item: null,
        };
    },
    async mounted () {
        this.getItem();
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

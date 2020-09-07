<template>
    <q-footer v-if='HomeOptions.ShowFooter' elevated>
        <q-card
            class = 'bg-primary'
            style = 'height: 100px'
        >
        </q-card>
    </q-footer>
</template>

<script>
export default {
    props: {
    },
    name: 'MainFooter',
    data () {
        return {
            HomeOptions : {},
        };
    },
    mounted () {
        this.HomeOptions = this.$store.state.home[0];
    }
};
</script>

<template>
    <q-footer v-if='HomeOptions.ShowFooter' elevated>
        <q-card
            class = 'bg-primary'
            style = 'height: 100px'
        >
            <div v-if ='$store.state.paymethods.length'>
                <q-card-section vertical style='margin:0;padding:0;'>
                    Avaible Payment Methods:
                </q-card-section>
                <q-card-section vertical>
                    <q-avatar size='30px'
                              stlye='margin:0;padding:0;'
                              v-for='p in $store.state.paymethods'
                              v-bind:key= p.Code>
                        <img :src=p.Image>
                    </q-avatar>
                </q-card-section>
            </div>
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

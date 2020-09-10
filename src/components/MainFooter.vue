<template>
    <q-footer v-if='HomeOptions.ShowFooter' reveal elevated>
        <div class="container" style='height:70px;'>
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text" style='margin:25px;'>Footer Content</h5>
                    <!-- <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p> -->
                </div>
                <div class="col l4 offset-l2 s12">
                    <h5 style='margin:25px;' class="white-text">Links....</h5>
                </div>
            </div>
        </div>
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

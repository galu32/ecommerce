<template>
    <q-footer v-if='HomeOptions.ShowFooter' reveal elevated>
        <div class="" style='height:100px;'>
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text" style='margin:10px;'>Navigation</h5>
                    <div style ='margin-left:20px;'> 
                        <q-btn flat dense round icon="mdi-home" to ='/' />
                        <q-btn flat dense round icon="mdi-mail" to ='/contact' />
                    </div>
                </div>
                <div class="col l6 s12">
                    <h5 class="white-text" style='margin:10px;'>Social</h5>
                    <q-btn flat dense round icon="facebook" />
                    <q-btn flat dense round icon="mdi-twitter" />
                    <q-btn flat dense round icon="mdi-instagram" />
                </div>
                <!-- <div class="col l6 s12">
                    <h5 class="white-text" style='margin:10px;'>Language</h5>
                    <q-btn flat dense round icon="mdi-english" />
                    <q-btn flat dense round icon="mdi-spanish" />
                </div> -->
            </div>
        </div>
    </q-footer>
</template>

<script>

export default {
    
    props: {
    },
    name: 'MainFooter',
    data() {
        return {
            HomeOptions : {},
        };
    },
    mounted() {
        this.HomeOptions = this.$store.state.home[0];
    }
};
</script>

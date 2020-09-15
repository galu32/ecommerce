<template>
    <q-footer v-if='HomeOptions.ShowFooter' reveal elevated>
        <div class="container" style='height:100px;'>
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
                    <!-- <router-link to='/' style = ' width: 100%;' class='text-white'> -->
                    <q-btn flat dense round icon="facebook" />
                    <q-btn flat dense round icon="mdi-twitter" />
                    <q-btn flat dense round icon="mdi-instagram" />
                    <!-- </router-link> -->
                    <!-- <router-link to='/' class='text-white' style = ' width: 100%;'> -->
                    <!-- <q-btn class="gt-xs" size="12px" flat dense round icon="whatsapp" @click='deleteCart' /> -->
                    <!-- </router-link> -->
                    <!-- <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p> -->
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

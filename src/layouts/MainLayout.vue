<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />
                <q-toolbar-title>
                    {{Title}}
                </q-toolbar-title>

                <q-select
                    filled
                    :value="searchModel"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="searchOptions"
                    @filter="search"
                    @input-value="setSearchModel"
                    style="width: 50%; margin-right:15px; height:30px"
                    class= "bg-white"
                >
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>

                <q-btn v-if='!userobj' color="primary" label="INGRESAR" @click="loginPrompt = !loginPrompt" />
                <q-btn v-if='userobj && userobj.Admin' color="primary" label="ADMIN" @click="adminModal = !adminModal" />
                <q-btn v-if='userobj && !userobj.Admin' color="primary" label="ACCOUNT" @click="accountModal = !accountModal" />
                <q-btn flat round color="white" icon ="shopping_cart" @click='cartModal = cartCounter ? !cartModal : $errorResponse("No cart items")'>
                    <q-badge color="red" floating transparent>
                        {{cartCounter}}
                    </q-badge>
                </q-btn>
                <q-btn flat round color="white" icon ="favorite" @click='favoriteCard = favoriteCounter ? !favoriteCard : $errorResponse("No favorite items")'>
                    <q-badge color="red" floating transparent>
                        {{favoriteCounter}}
                    </q-badge>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            content-class="bg-grey-1"
        >
            <q-list>
                <q-item
                    clickable
                    tag="a"
                    to='/'
                >
                    <q-item-section
                        avatar
                    >
                        <q-icon name='home' color='primary'/>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class='text-primary'>Home</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item-label
                    header
                    class="text-primary"
                >
                    Categorias
                    <!-- <q-separator /> -->
                </q-item-label>
                <CategoryItem
                    v-for="link in essentialLinks"
                    :key="link.Name"
                    v-bind="link"
                />
                <q-separator />
                <q-item
                    clickable
                    tag="a"
                    to='/contact'
                >
                    <q-item-section
                        avatar
                    >
                        <q-icon name='contact_mail' color='primary'/>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class='text-primary'>Contact Us</q-item-label>
                        <q-item-label caption class='text-grey'>
                            Contact Us
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
        <MainFooter />


        <q-dialog v-model="loginPrompt" > <!-- persistent -->
            <q-card style="min-width: 350px">
                <div v-if ='!registerModal'>
                    <q-card-section>
                        <div class="text-h6 text-primary">Sign in..</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input label='User' dense v-model="user" autofocus @keyup.enter="prompt = false" />
                        <q-input label='Pass' dense v-model="pass" @keyup.enter="prompt = false" />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Cancel" v-close-popup />
                        <q-btn flat label="Login" @click='login' v-close-popup/>
                    </q-card-actions>
                    <q-card-section class="q-pt-none">
                        <q-card-section>
                            <div style='display:inline-block; margin: 10px' class="text-h6 text-primary">Not registered?..</div>
                            <q-btn color="primary" label="Register" @click="registerModal = !registerModal" />
                        </q-card-section>
                    </q-card-section>
                </div>
                <div v-else>
                    <q-card-section>
                        <div class="text-h6 text-primary">Register..</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input label='User' dense v-model="user" autofocus @keyup.enter="prompt = false" />
                        <q-input label='Pass' dense v-model="pass" @keyup.enter="prompt = false" />
                        <q-input label='Name' dense v-model="name" @keyup.enter="prompt = false" />
                        <q-input label='Mail' dense v-model="mail" @keyup.enter="prompt = false" />
                    </q-card-section>
                    <div style='align-center'>
                        <q-btn color="primary" label="Go Back" style='display:inline-block; margin: 10px' @click='registerModal = !registerModal' />
                        <q-btn color="primary" label="Send" style='display:inline-block; margin: 10px' @click='sendRegister' />
                    </div>
                </div>
            </q-card>
        </q-dialog>

        <q-dialog
            v-model="adminModal"
            persistent
            :maximized="true"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="bg-primary text-white">
                <q-bar>
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                </q-bar>

                <!-- <q-card-section>
          <div class="text-h6">Settings:</div>
        </q-card-section> -->
                <AdminModal />
                <q-card-section class="q-pt-none">
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-dialog v-model="favoriteCard">
            <!-- <q-card class="">
            </q-card> -->
            <FavoriteCard/>
        </q-dialog>
        <q-dialog v-model="cartModal">
            <!-- <q-card class="">
            </q-card> -->
            <CartModal/>
        </q-dialog>
        <q-dialog v-model="accountModal">
            <!-- <q-card class="">
            </q-card> -->
            <AccountModal/>
        </q-dialog>

    </q-layout>
</template>

<script>
import MainFooter from 'components/MainFooter.vue';
import AdminModal from 'components/CRUD/AdminModal.vue';
import AccountModal from 'components/CRUD/AccountModal.vue';

const _ = require('lodash');

export default {
    name: 'MainLayout',
    components: {MainFooter, AdminModal, AccountModal}, //re-name
    data () {
        return {
            leftDrawerOpen: false,
            essentialLinks: [],
            loginPrompt: false,
            adminModal: false,
            cartModal: false,
            accountModal: false,
            registerModal: false,
            user: '',
            pass: '',
            mail: '',
            name: '',
            userobj: null,
            Title: '',
            HeaderImage: '',
            favoriteCounter: 0,
            cartCounter: 0,
            favoriteCard: false,
            searchModel: '',
            searchOptions: []
        };
    },
    methods: {
        login: async function () {
            let res = await this.$axios.post('/login', {user:this.user,pass:this.pass});
            if (!res.data.status) return;
            // if (!res.data.length) return;
            this.userobj = res.data.user;
            this.$store.commit('set', {key:'user', value:this.userobj});
        },
        getFavoriteCounter: function() {
            this.favoriteCounter = Object.keys(localStorage).filter(r => r.startsWith('fav') && localStorage.getItem(r) == 1).length;
        },
        getCartcounter: function () {
            let cartCounter = Object.keys(localStorage).filter(r => r.startsWith('cart')).map(r => parseInt(localStorage.getItem(r)));
            this.cartCounter = _.sum(cartCounter);

        },
        search: function (val,upd,abort) {
            let self = this;
            upd(() => {
                let v = val.toLowerCase();
                self.searchOptions = self.$store.state.items.filter(r => r.Name.toLowerCase().includes(v)).map(r => r.Name);
                // console.log(self.searchOptions);
            });
        },
        setSearchModel: function (val) {
            let i = this.$store.state.items.find(r => r.Name === val);
            if (!i) return;
            // console.log(this.$route);
            // let v = 'item/' + i.Code;
            // if (this.$route.path.includes('/item/')) v = i.Code;
            this.$router.push({ name:'item', params: {code: i.Code}});
        },
        sendRegister: async function () {
            if (!this.user || !this.pass || !this.mail || !this.name) return this.$errorResponse('All fields are required');
            let res = await this.$axios.post('/register', {user:this.user,pass:this.pass,mail:this.mail,name:this.name});
            res = res.data;
            if (!res) return this.$errorResponse('Error');
            if (res.res && res.res.errno) return this.$errorResponse(res.res.sqlMessage || 'Error');
            this.registerModal = false;
        },
        openEventModal: function (m) {
            if (m === 'register') {
                this.loginPrompt = true;
                this.registerModal = false;
            }
        }
    },

    async mounted(){
        let self = this;
        this.Title = this.$store.state.home[0].Title;
        this.essentialLinks = this.$store.state.categories;
        this.getFavoriteCounter();
        this.getCartcounter();
        this.$bus.$on('newFav', self.getFavoriteCounter);
        this.$bus.$on('newCart', self.getCartcounter);
        this.$bus.$on('openModal', self.openEventModal);
        this.searchOptions = this.$store.state.items.map(r => r.Name);
        await this.login();
    }
};
</script>
<style>
</style>
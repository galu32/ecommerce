
let t = `
<q-dialog v-model="openModal" > <!-- persistent -->
<q-card style="min-width: 350px">
    <div v-if ='loginType'>

        <q-card-section>
            <div class="text-h6 text-primary">Sign in..</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <component 
                v-for='f in loginFields'
                :key= 'f.field'
                :is="f.type"
                v-bind='f'
                v-model='f.value'
                @submit = 'sendLogin'
            />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" @click='openModal = false'/>
            <q-btn flat label="Login" @click='sendLogin' />
        </q-card-actions>
        <q-card-section class="q-pt-none">
            <q-card-section>
                <div style='display:inline-block; margin: 10px' class="text-h6 text-primary">Not registered?..</div>
                <q-btn color="primary" label="Register" @click="loginType = false" />
            </q-card-section>
        </q-card-section>
    </div>
    <div v-else>
        <q-card-section>
            <div class="text-h6 text-primary">Register..</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <component 
                v-for='f in registerFields'
                :key = 'f.field'
                :is="f.type"
                v-bind='f'
                v-model='f.value'
                @submit = 'sendRegister'
            />
        </q-card-section>
        <div style='align-center'>
            <q-btn color="primary" label="Go Back" style='display:inline-block; margin: 10px' @click='loginType = true' />
            <q-btn color="primary" label="Send" style='display:inline-block; margin: 10px' @click='sendRegister' />
        </div>
    </div>
</q-card>
</q-dialog>
`;



module.exports.init = function (Vue, store){
    let st = store.state.editableComponents[0].LoginRegister;
    const q = require ('quasar');
    Vue.component('LoginRegister', {
        template: st || t,
        components: {...q},
        props: {
            open: {
                type:Boolean,
                required:true
            },
            login: { //true login / false register
                type:Boolean,
                required:true
            }
        },
        name: 'LoginRegister',
        data () {
            return {
                loginType: true,
                openModal: false,
                loginFields: [],
                registerFields: [],
                model: null
            };
        },
        methods: {
            sendRegister: async function () {
                if (!this.checkFields()) return this.$errorResponse('All fields are required');
                let l = {};
                for (let f of this.registerFields) l[f.field] = f.value;
                let res = await this.$axios.post('/register', l);
                console.log(res);
                res = res.data;
                if (!res) return this.$errorResponse('Error');
                if (res.res && res.res.errno) return this.$errorResponse(res.res.sqlMessage || 'Error');
                this.loginType = true;

            },
            sendLogin: async function () {
                if (!this.checkFields()) return this.$errorResponse('All fields are required');
                let l = {};
                for (let f of this.loginFields) l[f.field] = f.value;
                let res = await this.$axios.post('/login', l);
                if (!res.data.status) return;
                // if (!res.data.length) return;
                this.$bus.$emit('login',res.data.user);
                this.$store.commit('set', {key:'user', value:res.data.user});
                this.openModal = false;
            },
            checkFields: function () {
                let fs = this.loginFields;
                if (!this.loginType) fs = this.registerFields;
                for (let f of fs) if (!f.value) return false;
                return true;
            }
        },
        watch: {
            login: function () {
                this.loginType = this.login;
            },
            open: function () {
                this.openModal = this.open;
            }
        },
        mounted () {
            let self = this;
            this.$bus.$on('openModal', (m) => {
                if (m === 'register'){
                    this.openModal = true;
                    this.loginType = true;
                }
            });
            let m = this.$models.User;
            this.model = new m();
            let loginFields = m.getLoginFields();
            let registerFields = m.getRegisterFields();
            this.loginFields = loginFields.map(r => {
                return {
                    field: r,
                    value: undefined,
                    readonly: false,
                    required: true,
                    type: this.model.fields[r].type
                };
            });
            this.registerFields = registerFields.map(r => {
                return {
                    field: r,
                    value: undefined,
                    readonly: false,
                    required: true,
                    type: this.model.fields[r].type
                };
            });
        }
    });
};
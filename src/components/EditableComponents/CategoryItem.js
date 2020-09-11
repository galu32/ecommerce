let t = `
    <div>
        <!-- target="_blank" -->
        <q-item
            v-if='!SubCategories.length'
            clickable
            tag="a"
            :href="Link"
            :to=buildPath()
        >
            <q-item-section
                v-if="Icon"
                avatar
            >
                <q-icon :name="Icon" color='primary'/>
            </q-item-section>

            <q-item-section>
                <q-item-label class='text-primary'>{{ Name }}</q-item-label>
                <q-item-label caption class='text-grey'>
                    {{ Description }}
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-expansion-item
            v-else
            :content-inset-level="1"
            expand-separator
            :icon="Icon"
            :label="Name"
            :caption="Description"
            default-closed
            class='text-primary'
        >
            <!-- <q-expansion-item switch-toggle-side dense-toggle label="Today" :header-inset-level="1" :content-inset-level="2"> -->

            <q-item
                v-for='subc in SubCategories'
                :key = 'subc.Code'
                clickable
                tag="a"
                :to=buildPath(subc.Code)
            >
                <q-item-section
                    v-if="subc.Icon"
                    avatar
                >
                    <q-icon :name="subc.Icon" color='primary'/>
                </q-item-section>

                <q-item-section>
                    <q-item-label class='text-primary'>{{ subc.Name }}</q-item-label>
                    <q-item-label caption class='text-grey'>
                        {{ subc.Description }}
                    </q-item-label>
                </q-item-section>
            </q-item>
            <!-- </q-expansion-item>     -->
        </q-expansion-item>
        <q-separator />
    </div>`;
module.exports.init = function (Vue,store){
    let st = store.state.editableComponents[0].CategoryItem;
    const q = require ('quasar');
    Vue.component('CategoryItem', {
        template: st || t,
        components: {...q},
        name: 'CategoryItem',
        props: {
            Name: {
                type: String,
                default : 'TEST'
            },

            Description: {
                type: String,
                default: 'TEST LINK'
            },

            Link: {
                type: String,
                default: '#'
            },

            Icon: {
                type: String,
                default: 'home'
            },
            Code: {
                type: String,
                default : '',
            }
        },
        data() {
            return {
                SubCategories : [],
                refCode : ''
            };
        },
        mounted() {
            this.SubCategories = this.$store.state.subcategories.filter(r => r.Parent === this.Code);
        },
        methods: {
            buildPath: function (code = false) {
                if (!this.Code) return;
                let p = '/categories/' + this.Code;
                if (!code) return p;
                else return p + '/' + code;
            }
        }
    });
};
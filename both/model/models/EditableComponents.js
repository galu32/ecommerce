let Parent = require('./Model');

class EditableComponents extends Parent {

    constructor() {
        super();
    }

    async init() {
        await super.init();
    }


    getFields(){
        this.__singleton = true;
        return {
            ProductCard: {type: 'component'},
            FavoriteCard: {type: 'component'},
            CategoryItem: {type: 'component'},
            MainItems: {type: 'component'},
            ItemCard: {type: 'component'},
        };
    }

    registerComponent(Vue,field){
        let self = this;
        const q = require ('quasar');
        let t = `
            <q-card>
            <q-card>
                <q-input
                hint = '${field}'
                type = 'textarea'
                square filled v-model="model" />
                <div class='text-h3 text-primary'> Preview: </div>
                <q-separator/>
                <${field}/>
            </q-card>
            <q-separator/>
            <q-btn color="primary" label="Save" @click="save" class='' style='margin-top:10px'/>
            <q-btn color="primary" label="Restore" @click="restore" class='' style='margin-top:10px'/>
            </q-card>
            `;
        Vue.component('Field'+field, {
            template: t,
            components: {...q},
            name: 'Field'+field,
            props: {
                value : {
                    type: String,
                }
            },
            data () {
                return {
                    model: ''
                };
            },
            methods: {
                save : async function () {
                    self[field] = this.model;
                    let res = await self.save();
                    console.log(res);
                    if (!res.status) return this.$q.notify(res.err.sqlMessage);
                },
                restore: async function () {
                    self[field] = undefined;
                    let res = await self.save();
                    console.log(res);
                    if (!res.status) return this.$q.notify(res.err.sqlMessage);
                    this.model = '';
                }
            },
            mounted () {
                let div = 
`
<div>
</div>
`;
                this.model = this.value || div;
            }
        });
    }

}

module.exports = EditableComponents;
<template>
    <q-card>
        <q-tabs
            v-model="tab"
            dense
            align="left"
            class="bg-primary text-white shadow-2"
            :breakpoint="0"
        >
            <q-tab name="Account" icon="person" />

        </q-tabs>
        <q-card v-if='tab === "Account"'>
            <div
                style = 'width:50%; display: inline-block; padding: 10px'
                v-for='f in Fields'
                v-bind:key = f.field>
                <component v-if='f.type !== "component"' :is="f.type" v-bind='f' v-model='f.value' style = ''/>
                <component v-else :is="'Field' + f.field" :value='f.value' style = ''/>
            </div>
            <div style= 'diplay:flex; justify-content: center'>
                <q-btn
                    color="primary" label="Save" @click="save" class='center' style='   margin: auto;
                                                                                        width: 50%;
                                                                                        border: 3px solid;
                                                                                        padding: 10px;
                                                                            ' />
                <q-btn
                    color="primary" label="Logout" @click="logout" class='center' style='   margin: auto;
                                                                                        width: 50%;
                                                                                        border: 3px solid;
                                                                                        padding: 10px;
                                                                            ' />

            </div>
        </q-card>
    </q-card>
</template>

<script>

export default {
    components: {},
    name: 'AccountModal',
    data () {
        return {
            tab: 'Account',
            model: null,
            Fields: [],
        };
    },
    mounted () {
        let cls = this.$models.User;
        cls = new cls();
        this.model = cls;
        this.getFields();
        this.loadUserFields();
    },
    methods: {
        getFields: function() {
            this.Fields = [];
            let Fields = this.model.fields;
            this.Fields = Object.keys(Fields).filter(f => !Fields[f].internal && f !== 'Admin')
                .map(f => {
                    let i = {
                        field: f,
                        value: undefined,
                        readonly: Fields[f].readonly || false,
                        required: Fields[f].required,
                        linkto: Fields[f].linkto,
                        type: Fields[f].type
                    };
                    return i;
                });
        },
        loadUserFields: function () {
            for (let f of this.Fields){
                f.value = this.$store.state.user[f.field];
            }
        },
        save: async function () {
            let row = {};
            for (let f of this.Fields)
                if (f.required && !f.value && f.value !== 0) return this.$errorResponse('Required field ' + f.field);
                else row[f.field] = f.value;
            row['internalId'] = this.$store.state.user.internalId;
            this.model.loadFromRow(row);
            let res = await this.model.save();
            if (res.status && res.res.errno) return this.$errorResponse(res.res.sqlMessage);
            await this.updateContext();
        },
        logout: function() {
            this.$bus.$emit('logout');
            this.$store.commit('set', {key:'user', value:null});
        },
        updateContext: async function () {
            let d = {};
            for (let f of this.Fields)
                d[f.field] = f.value;
            d.internalId = this.$store.state.user.internalId;
            this.$store.commit('set', {key:'user', value:d});
            await this.$axios.post('/updateContext', {internalId:d.internalId});
        }
    }
};
</script>

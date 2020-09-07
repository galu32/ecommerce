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
                v-for='f in Fields.filter(r => r.type !== "component")'
                v-bind:key = f.field>
                <q-input
                    v-if = 'f.type !== "boolean" && f.type !== "set" && f.type !== "component"'
                    v-bind:hint = f.field
                    v-bind:readonly = f.readonly
                    v-bind:type = f.type
                    class = ''
                    :mask= "f.type === 'value' ? '#.##' : '' "
                    :fill-mask= "f.type === 'value' ? false : '' "
                    square filled v-model="f.value" />
                <q-select
                    v-if = 'f.type === "set"'
                    filled
                    quare
                    v-model= "f.value"
                    multiple
                    :options='f.linkto ? $store.state[f.linkto.toLowerCase()].map(r => r.Code) : []'
                    use-chips
                    stack-label
                    :label=f.field
                />
                <q-checkbox
                    v-if = 'f.type === "boolean"'
                    v-bind:label = f.field
                    class = 'text-primary'
                    left-label
                    v-model = "f.value"
                />
            </div>
            <div 
                v-for = 'f in Fields.filter(r => r.type === "component")'
                v-bind:key = f.field
                style = 'width:50%; display: inline-block; padding: 10px;'
            >
                <component :is="'Field' + f.field" :value='f.value' style = ''></component>
            </div>
            <div style= 'diplay:flex; justify-content: center'>
                <q-btn
                    color="primary" label="Save" @click="save" class='center' style='   margin: auto;
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
                    let i = {field:f, value:undefined, readonly: Fields[f].readonly, required: Fields[f].required, linkto: Fields[f].linkto };
                    if (Fields[f].type === 'integer' || Fields[f].type === 'value')
                        i.type = 'number';
                    else if (Fields[f].type === 'string')
                        i.type = 'text';
                    else if (Fields[f].type === 'boolean')
                        i.value = false;
                    if (!i.type)
                        i.type = Fields[f].type;
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

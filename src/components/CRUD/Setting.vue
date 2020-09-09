<template>
    <div class="q-pa-md">
        <div class="text-h6 text-primary">Settings {{Model}}:</div>
        <q-table
            v-if = '!singleton'
            :data="Items"
            :columns="Columns"
            row-key="internalId"
            :filter="filter"
            :grid="$q.screen.xs"
            @row-click='click'
            :visible-columns = visibleColumns
        >
            <template v-slot:top-right>
                <q-select
                    filled
                    v-model="visibleColumns"
                    multiple
                    v-bind:options = 'Fields.map(f => f.field)'
                />
                <!-- <q-separator/> -->
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>
        <q-separator/>
        <q-card>
            <q-card-section>
                <div class="text-h6 text-primary">New :</div>
            </q-card-section>
            <q-card-section >
                <div
                    style = 'width:25%; display: inline-block; padding: 10px'
                    v-for='f in Fields.filter(r => r.type !== "component")'
                    v-bind:key = f.field>
                    <component v-if='f.type !== "compontent"' :is="f.type" v-bind='f' v-model='f.value' style = ''/>
                    <component v-else :is="'Field' + f.field" :value='f.value' style = ''/>
                </div>
            </q-card-section>
            <q-card-section >
                <q-btn
                    v-if = '!singleton'
                    color="primary" label="Clear" @click="getFields" class='' />
                <q-btn
                    v-if = 'showSave'
                    color="primary" label="Save" @click="save" class='' />
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    components: {},
    name: 'Setting',
    props: {
        Model: {
            type: String,
            required: true,
        },
        showSave: {
            type: Boolean,
            default: true,
        }
    },
    data () {
        return {
            Items : [],
            Columns: [],
            filter: '',
            Fields: [],
            currentRow: null,
            visibleColumns: [],
            singleton: false,
        };
    },
    watch: {
        Model: async function(){
            await this.load();
        }
    },
    async mounted(){
        await this.load();
    },
    methods: {
        click: function (evt,row,index) {
            this.currentRow = row;
            for (let f of this.Fields){
                if (f.type === 'boolean'){
                    f.value = row[f.field] ? true : false;
                    continue;
                }else if (f.type === 'set' && row[f.field]){
                    f.value = row[f.field].split(',');
                    continue;
                }
                f.value = row[f.field];
            }
        },
        save: async function () {
            let model = new this.$models[this.Model]();
            let row = {};
            for (let f of this.Fields){
                if (f.required && f.type !== 'boolean' && !f.value && f.value !== 0) return this.$errorResponse(f.field + ' Is Required');
                row[f.field] =  f.value;
            }
            if (this.currentRow && this.currentRow.internalId)
                row['internalId'] = this.currentRow['internalId'];
            model.loadFromRow(row);
            let res = await model.save();
            console.log(res);
            if (res.status && res.res.errno) return this.$errorResponse(res.res.sqlMessage);
            await this.load();
        },
        load: async function(){
            await this.getRows();
            await this.getFields();
            this.getColumns();
        },
        getColumns: function(){
            this.Columns = this.Fields.map(r => 
                ({ name: r.field, align: 'center', label: r.field, field: r.field, sortable: false }),
            );
            this.visibleColumns = this.Fields.map(r => r.field);
        },
        getRows: async function () {
            let items = await this.$query.select(['*']).from(this.Model).fetch();
            this.Items = items;
        },
        getFields: async function () {
            this.currentRow = null;
            this.Fields = [];
            let Model = new this.$models[this.Model]();
            let Fields = Model.fields;
      
            this.Fields = Object.keys(Fields).filter(f => !Fields[f].internal)
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
            this.singleton = Model.__singleton;
            if (this.singleton) await this.loadSingleton();
        },
        loadSingleton: async function () {
            let q = this.Items;
            if (q.length)
                for (let f of this.Fields)
                    if (f.type === 'boolean'){
                        f.value = q[0][f.field] == 0 ? false : true;
                        continue;
                    }else f.value = q[0][f.field];
        }
    }
};
</script>
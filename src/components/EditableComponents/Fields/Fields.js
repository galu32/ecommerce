/* ejemplo para invoicar componentes de tipo field

js:
    let i = {
        field: 'Code',
        value: 'value',
        readonly: true || false,
        required: true || false
        linkto: ShipMethods // otro model al cual el campo CODE se usara como opciones, solo type set
        type: set || string || integer || etc
    };

template:
    <component 
        :is="i.type"
        v-bind='i'
        v-model='i.value' //puede ser otra varibale almacena el valor
    />

*/


let globals = {
    props: {
        value: { //variable que retorna el valor del field.
            // tiene que ser la propiedad de un diccionario.
            required: true,
        },
        readonly: {
            required: false,
            default: false,
            type: Boolean
        },
        field : {
            required: true, //a que campo pertenece para labels. 
            type: String
        }
    }
};

let fields = { //el nombre del componente es igual al tipo de campo en la clase del modelo y de mysql
    //tipo / template
    string : `
        <q-input
            v-bind:hint = field
            v-bind:readonly = readonly
            type = 'text'
            class = ''
            square filled
            v-model="content"
            v-on:keyup.enter="submit"
        />`
    ,
    textareas : `
        <q-input
            v-bind:hint = field
            v-bind:readonly = readonly
            type = 'textarea'
            class = ''
            square filled
            v-model="content"
            v-on:keyup.enter="submit"
        />`
    ,
    integer : `
        <q-input
            v-bind:hint = field
            v-bind:readonly = readonly
            type = 'number'
            class = ''
            square filled
            v-model="content"
            v-on:keyup.enter="submit"
        />`
    ,
    boolean: `
        <q-checkbox
            v-bind:label = field
            class = 'text-primary'
            left-label
            v-model = "content"
            v-on:keyup.enter="submit"
        />`
    ,
    set : `
        <q-select
            filled
            quare
            v-model= "content"
            :multiple = "multiple"
            :options='options'
            use-chips
            stack-label
            :label=field
            v-on:keyup.enter="submit"
        />`
    ,
    value: `
        <q-input
            v-bind:hint = field
            v-bind:readonly = readonly
            type = 'number'
            class = ''
            mask= "'#.##'"
            square filled 
            v-model="content"
            v-on:keyup.enter="submit"
        />
        `

};



module.exports.init = function (Vue, store){
    let st = store.state.editableComponents[0].ProductCard;
    const q = require ('quasar');
    for (let f in fields){
        let noglobalprops = {};
        if (f === 'set') {
            noglobalprops.linkto = {required: true};
            noglobalprops.multiple = {default: true, type:Boolean};
        }
        Vue.component(f, {
            template: fields[f],
            components: {...q},
            props: {...globals.props, ...noglobalprops},
            model: {
                prop: 'v-model',
                event: 'input'
            },
            data() {
                let def = {
                    content: this.value
                };
                if (f === 'set')
                    def.options = [];
                return def;
            },
            mounted() {
                if (f === 'set'){
                    if (typeof this.linkto === 'string')
                        this.options = this.$store.state[this.linkto.toLowerCase()].map(r => r.Code);
                    else
                        this.options = this.linkto;
                }else if (f === 'boolean'){
                    if (typeof this.value === 'undefined')
                        this.content = false;
                }
            },
            watch: {
                value: function () {
                    this.content = this.value;
                },
                content: function () {
                    let c = this.content;
                    this.$emit('input', c);
                }
            },
            methods : {
                getValue: function () {
                    return this.content;
                },
                submit: function (k) {
                    this.$emit("submit");
                }
            }
        });
    }
};
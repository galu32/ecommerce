<template>
    <q-scroll-area
        style="height: 85vh; width: 100%;"
        class="bg-grey-1 rounded-borders">
        <q-page style= 'display:flex; justify-content: center'>
            <q-card style = 'height: 55vh; width: 60%; margin: 10px; padding: 10px;' class=''>
                <div class="text-h3 text-primary text-center">Contact Us:</div>
                <q-input
                    v-for = 'f in Fields'
                    v-bind:key = f.field
                    v-bind:hint = f.field
                    class = ''
                    :type = f.type
                    square filled v-model="f.value" />
                <div style ='display:flex; justify-content:center;'>
                    <q-btn style='margin:15px' color="primary" label="Clear" @click="1" />
                    <q-btn style='margin:15px' color="primary" label="Send" @click="1" />
                </div>
            </q-card>
        </q-page>
    </q-scroll-area>
</template>
<script>
export default {
    name: 'Contact',
    components: {},
    props: {
    },
    data () {
        return {
            Fields: [
                {field: 'Name', type: 'text', value:null},
                {field: 'Email', type: 'text', value:null},
                {field: 'Phone', type: 'text',value:null},
                {field: 'Message', type: 'textarea',value:null},
            ]
        };
    },
    async mounted () {
    },
    watch: {
    },
    methods: {
    }
};
</script>

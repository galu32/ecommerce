<template>
    <q-card>
        <q-tabs
            v-model="tab"
            dense
            align="left"
            class="bg-primary text-white shadow-2"
            :breakpoint="0"
        >
            <q-tab name="Home" icon="home" />
            <q-tab name="Items" icon="smartphone" />
            <q-tab name="Users" icon="person" />
            <q-tab name="Categories" icon="collections" />
            <q-tab name="SubCategories" icon="collections" />
            <q-tab name="EditableComponents" icon="collections" />

        </q-tabs>
        <q-card v-if='tab === "Home"'>
            <Setting Model = 'Home' />
        </q-card>
        <q-separator />
        <q-card v-if='tab === "Items"'>
            <Setting Model = 'Item' />
        </q-card>
        <q-card v-if='tab === "Users"'>
            <Setting Model = 'User' />
        </q-card>
        <q-card v-if='tab === "Categories"'>
            <Setting Model = 'Categories' />
        </q-card>
        <q-card v-if='tab === "SubCategories"'>
            <Setting Model = 'SubCategories' />
        </q-card>
        <q-card v-if='tab === "EditableComponents"'>
            <Setting v-bind:showSave=false Model = 'EditableComponents'/>
        </q-card>
    </q-card>
</template>

<script>
import Setting from './Setting.vue';

export default {
    components: {Setting},
    name: 'AdminModal',
    data () {
        return {
            tab: 'Items'
        };
    }
};
</script>

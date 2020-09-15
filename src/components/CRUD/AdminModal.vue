<template>
    <q-card>
        <q-tabs
            v-model="tab"
            dense
            align="left"
            class="bg-primary text-white shadow-2"
            :breakpoint="0"
        >
            <q-tab name="Home" icon="home" label='Home' />
            <q-tab name="Items" icon="smartphone" label='Items' />
            <q-tab name="Users" icon="person" label='Users' />
            <q-tab name="Categories" icon="collections" label='Categories' />
            <q-tab name="SubCategories" icon="collections_bookmark" label='Sub-Categories' />
            <q-tab name="Coupon" icon="credit_card" label='Coupons' />
            <q-tab name="PayMethod" icon="payment" label='Pay Methods' />
            <q-tab name="ShipMethod" icon="local_shipping" label='Ship Methods' />
            <q-tab name="EditableComponents" icon="settings_input_component" label='Components' />
            <q-tab name="MailSettings" icon="mail" label='Mailing' />

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
        <q-card v-if='tab === "Coupon"'>
            <Setting Model = 'Coupon'/>
        </q-card>
        <q-card v-if='tab === "PayMethod"'>
            <Setting Model = 'PayMethod'/>
        </q-card>
        <q-card v-if='tab === "ShipMethod"'>
            <Setting Model = 'ShipMethod'/>
        </q-card>
        <q-card v-if='tab === "MailSettings"'>
            <Setting Model = 'MailSettings'/>
        </q-card>
    </q-card>
</template>

<script>
import Setting from './Setting.vue';

export default {
    components: {Setting},
    name: 'AdminModal',
    data() {
        return {
            tab: 'Home'
        };
    }
};
</script>

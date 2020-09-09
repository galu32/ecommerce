//load misc resources

export default async ({ store,Vue }) => {
    Vue.prototype.$bus = new Vue; //global event bus
    Vue.prototype.$errorResponse = (txt) => { //global error response
        Vue.prototype.$q.notify({
            message: txt,
            position: 'center',
            type: 'negative',
        });
        return false;
    };

};
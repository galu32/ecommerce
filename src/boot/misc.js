//load misc resources

export default async ({ store,Vue }) => {
    if (typeof window === 'undefined') return; //load on client only
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
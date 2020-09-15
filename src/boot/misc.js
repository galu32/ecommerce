//load misc resources
import { colors } from 'quasar';

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
    Vue.prototype.$response = (txt) => {
        Vue.prototype.$q.notify({
            message: txt,
            position: 'center',
            type: 'positive',
        });
        return false;
    };
    if (typeof window !== 'undefined')
        colors.setBrand('primary', store.state.home[0].PrimaryColor || '#1976D2');

};
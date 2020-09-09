/* add Query stream to Vue context */
const {query} = require('oo');
export default async ({ Vue }) => {
    if (typeof window === 'undefined') return; //load on client only
    Vue.prototype.$query = new query();
};
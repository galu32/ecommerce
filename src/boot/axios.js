/* add Axios to Vue context */

export default async ({ Vue }) => {
    if (typeof window === 'undefined') return; //load on client only
    let axios = require('axios');
    Vue.prototype.$axios = axios;
};
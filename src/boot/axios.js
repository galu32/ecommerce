/* add Axios to Vue context */

export default async ({ Vue, store }) => {
    let axios = require('axios');
    Vue.prototype.$axios = axios;
    // Vue.prototype.$axios.interceptors.request.use((config) => {
    //     let {tk} = store.state;
    //     config.headers.Authorization =  tk;
    
    //     return config;
    // });
};
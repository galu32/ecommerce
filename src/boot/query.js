/* add Query stream to Vue context */
const {query} = require('oo');
export default async ({ Vue }) => {
    Vue.prototype.$query = new query();
};
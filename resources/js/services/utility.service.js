import Vue from "vue";


export default class UtilityService {

    constructor() {}

    showLoader() {
        console.log('show was clicked, click to hide');
        // do AJAX here
        Vue.$loading.show();
        // setTimeout(() => loader.hide(), 3 * 1000)
    }

    hideLoader() {
        Vue.$loading.hide();
    }

    presentSuccessToast(msg) {
        // Vue.$toast.success(msg,options)
        Vue.toasted.success(msg);

    }

    presentFailureToast(msg) {
        // console.log(msg.message,'message');
        Vue.toasted.error(msg);
        // Vue.$toast.error(msg,options);
    }

    //
    // hideLoader() {
    //     let loader = Vue.$loading.hide();
    // }


}

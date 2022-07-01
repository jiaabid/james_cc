import ApiService from "./api.service";
const apiService = new ApiService();
import UtilityService from "./utility.service";
const utilityService = new UtilityService();
import SqliteService from "./sqlite.service";
const sqliteService = new SqliteService();

let sqlite = new SqliteService();

export default class NetworkService {

    constructor() {}
    /////////////// Dashboard Api's///////////////

    getDashboardCards(){
        return this.axiosGetResponse('dashboard/cards')
    }
    getPropertyList(){
        return this.axiosGetResponse('dashboard/property-list')
    }
    getBuildingList(){
        return this.axiosGetResponse('dashboard/building-list')
    }
    getUserList(){
        return this.axiosGetResponse('dashboard/user-list')
    }
    getMeterList(){
        return this.axiosGetResponse('dashboard/meter-list')
    }

    getBunch(data) {
        return this.axiosPostResponse('property/equipment/all-bunch', data, null, false, true);
    }
    // properties Api's
    getProperties(data) {
        return this.axiosPostResponse('property/all', data, null, false, true);
    }
    addProperty(data) {
        return this.axiosPostResponse('property/add', data, null, false, true);
    }

    // Equipments
    // buildings Api's
    getBuildings(propertyID, data) {
        return this.axiosPostResponse('property/equipment/building/all-buildings/'+propertyID,data, null, false, false);
    }
    addBuilding(data) {
        return this.axiosPostResponse('property/equipment/building/add-building', data, null, false, true);
    }

    addMultipleUnits(data) {
        return this.axiosPostResponse('property/equipment/unit/add-multiple-units', data, null, false, true);
    }
    getUnits(data) {
        return this.axiosPostResponse('property/equipment/unit/all-units', data, null, false, true);
    }
    addUnit(data) {
        return this.axiosPostResponse('property/equipment/unit/add-unit', data, null, false, true);
    }
    getSingleUnit(id) {
        return this.axiosGetResponse('property/equipment/unit/'+id, false, false);
    }
    addType(data) {
        return this.axiosPostResponse('/property/equipment/type/add-type', data, null, false, true);
    }
    // Meters API
    getMeters() {
        return this.axiosGetResponse('property/equipment/meter/all-meters',false, false);
    }
    // Billing
    getBillings() {
        return this.axiosGetResponse('property/billing-company/all',false, false);
    }
    //Management Company
    getManagers() {
        return this.axiosGetResponse('property/management-company/all',false, false);
    }
    getUnitsOfMeasure() {
        return this.axiosGetResponse('property/equipment/unit-of-measure/all',false, false);
    }
    // User Api's
    getUsers(data) {
        return this.axiosPostResponse('user/all', data, null, false, true);
    }
    addUser(data) {
        return this.axiosPostResponse('user/add', data, null, false, true);
    }
    editUser(id, data){
        return this.axiosPatchResponse('user/update-user/'+id, data, null, false, true);
    }
    deleteUser(id){
        return this.axiosDeleteResponse('user/delete', id = id);
    }

    addFcmToken(data){
        return this.axiosPostResponse('user/set-fcm-token', data, null, false, true);
    }

    firebaseNotification(data){
        return this.axiosPostResponse('property/equipment/meter/notification-send', data, null, false, true);
    }
    saveFirebaseNotification(data){
        return this.axiosPostResponse('property/equipment/meter/notification-save', data, null, false, true);
    }
    showFirebaseNotification(){
        return this.axiosGetResponse('property/equipment/meter/notification-show', false, false);
    }
    updateNotificationStatus(id){
        return this.axiosGetResponse('property/equipment/meter/notification-update/'+id, false, false);
    }

    addMeterTypeBuilder(data) {
        return this.axiosPostResponse('property/equipment/type/add-type', data, null, false, true);
    }
    addMeter(data){
        return this.axiosPostResponse('property/equipment/meter/add-meter', data, null, false, true);

    }
    //Update responsed

    updateBuilding(id, data){
        return this.axiosPatchResponse('property/equipment/building/update-building/'+id, data, null, false, true);
    }
    EditMeterTypeBuilder(id, data){
        return this.axiosPatchResponse('property/equipment/type/update-type/'+id, data, null, false, true);
    }
    updateUnit(id, data){
        return this.axiosPatchResponse('property/equipment/unit/update-unit/'+id, data, null, false, true);
    }
    updateProperty(id, data){
        return this.axiosPatchResponse('property/update/'+id, data, null, false, true);
    }
    //POST RESPONSES
    addManufacturer(data){
        return this.axiosPostResponse('property/equipment/manufacturer/add', data, null, false, true);
    }
    addDevice(data){
        return this.axiosPostResponse('property/equipment/device/add', data, null, false, true);
    }

    getMeterReading(id, data) {
        return this.axiosPostResponse('property/equipment/meter-reading/all/'+id,data, false, false);
    }
    getChartMeterReading(id, data) {
        return this.axiosPostResponse('property/equipment/meter-reading/chart-meter-all/'+id, data, false, false);
    }
    addMeterReading(data){
        return this.axiosPostResponse('property/equipment/meter-reading/add', data, false, false);
    }
    //GET RESPONSES
    getRoles(){
        return this.axiosGetResponse('user/allRoles',false, false);
    }
    getManufacturers() {
        return this.axiosGetResponse('property/equipment/manufacturer/all',false, false);
    }
    //devices of the specific manufacturer
    getDevices(id) {
        return this.axiosGetResponse('property/equipment/device/all/'+id, false, false);
    }
    getTransceiverChart(id){
        return this.axiosGetResponse('property/transceivers/'+id, false, false);
    }
    //all devices
    allDevices() {
        return this.axiosGetResponse('property/equipment/device/all', false, false);
    }
    getDeviceTypes(){
        return this.axiosGetResponse('property/equipment/device-type/all', false, false);
    }

    //Reporting
    pendingMeterTypeCard(){
        return this.axiosGetResponse('reporting/pending-meter-type', false, false);
    }
    allPendingMeterTypeCard(){
        return this.axiosGetResponse('reporting/all-pending-meter-types', false, false);
    }
    pendingMeterInfo(){
        return this.axiosGetResponse('reporting/pending-meter-info', false, false);
    }
    updateMeter(id, data){
        return this.axiosPatchResponse('property/equipment/meter/update-meter/'+id, data, null, false, true);
    }
    deleteMeter(id){
        return this.axiosDeleteResponse('property/equipment/meter/delete-meter', id = id);
    }
    //Reason related apis
    //Get option Reasons
    getOptionReasons(){
        return this.axiosGetResponse('property/equipment/unit/option-reasons/all', false, false);
    }
    //Post Reason
    addReason(data){
        return this.axiosPostResponse('property/equipment/unit/reason', data, null, false, true);
    }
    getMeterInfo(data){
        return this.axiosPostResponse('property/equipment/unit/get-meter-info', data, null, false, true);
    }


    //Delete responses
    deleteProperty(id){
        return this.axiosDeleteResponse('property/delete', id = id);
    }
    deleteBuilding(id){
        return this.axiosDeleteResponse('property/equipment/building', id = id);
    }
    deleteUnitMeter(id){
        return this.axiosDeleteResponse('property/equipment/unit/unit-meter', id = id);
    }
    deleteUnit(id){
        return this.axiosDeleteResponse('property/equipment/unit', id = id);
    }
    getPropertyName(id){
        return this.axiosGetResponse('property/'+id,false, false);
    }
    // Auth Api's
    login(data) {
        return this.axiosPostResponse('auth/login', data, null, false, true);
    }

    sendUserUpdatedData(data){
        return this.axiosPostResponse('user/change_email_or_contact', data);
    }

    axiosGetResponse(key, id = null, showLoader = false, showError = true, contentType = 'application/json') {
        return this.httpResponse('get', key, {}, id, showLoader, showError, contentType);
    }

    axiosPostResponse(key, data, id = null, showLoader = false, showError = true, contentType = 'application/json') {
        return this.httpResponse('post', key, data, id, showLoader, showError, contentType);
    }

    // axiosPostLoginResponse(key, data, id = null, showLoader = false, showError = true, contentType = 'application/json') {
    //     return this.httpResponse('post', key, data, id, showLoader, showError, contentType);
    // }

    axiosPatchResponse(key, data, id = null, showloader = false, showError = true, contenttype = 'application/json') {
        return this.httpResponse('patch', key, data, id, showloader, showError, contenttype);
    }

    axiosDeleteResponse(key, id = null, showloader = false, showError = true, contentType = 'application/json') {
        return this.httpResponse('delete', key, {}, id, showloader, showError, contentType);
    }

    // axiosPostResponse(api, data, config = {}) {
    //     return apiService.post(api, data, config);
    // }





    httpResponse(type = 'get', key, data, id = null, showLoader = false, showError = true, contentType = 'application/json') {

        return new Promise((resolve, reject) => {

            if (showLoader == true) {
                utilityService.showLoader();
            }

            const _id = (id) ? '/' + id : '';
            const url = key + _id;

            // let headers = {
            //     'Authorization': 'Bearer' + sqliteService.getToken()
            // }
            const seq = (type == 'get') ? apiService.get(url) : ((type == 'patch') ? apiService.patch(url, data) : ((type=='delete') ? apiService.delete(url) : apiService.post(url, data)));

            seq.then((res) => {
                if (res.status != 200) {
                    if (showError == true) {
                        utilityService.presentFailureToast(res['message']);
                    }

                    if(res.status == 401){
                        // redirect it to login page
                        this.$router.push({ path: 'login', query: {} });

                    }

                    reject(null);
                    return;
                }

                resolve(res.data);


                // this.utility.presentSuccessToast(res['message']);

            }, (err) => {

                let error = err;

                if (showLoader == true) {
                    utilityService.hideLoader();
                }

                if (showError == true) {
                    utilityService.presentFailureToast(error['message']);
                }

                if(err.status == 401){
                    // redirect it to login page
                    sqlite.setLogout();
                    this.$router.push({ path: '/', query: {} });
                }

                reject(err);

            }).catch((err) => {
                console.log(err,"CATCH FROM NETWORK");
            })

        });

    }
}

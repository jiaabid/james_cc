import NetworkService from "./network.service";
const networkService = new NetworkService();

export default class MenuService {
    constructor() {
    }

    menus = [];

    async getMenus() {
        this.menus = await networkService.getMenus();
        console.log(this.menus, 'In service');
    }


}

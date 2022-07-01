
export default class StorageService {

    constructor() { }

    set(key, data){

        return new Promise( resolve => {
            localStorage.setItem(key, JSON.stringify(data))
            resolve(true);
        });

    }

    get(key){

        return new Promise( resolve => {
            let data = localStorage.getItem(key);
            resolve(JSON.parse(data))
        });

    }

}


import StorageService from "./storage.service";
import {browserDBInstance} from "./browser-db-instance";

const SQL_DB_NAME = '__broswer.db';

export default class SqliteService {

    constructor(db = null, storage = null) {
        self.db = db;
        self.storage = new StorageService();
        let dbconfig = {
            name: 'ion_meter_bh.db',
            location: 'default'
        }
    }

    initializeDatabase() {

        return new Promise(async resolve => {
            // initialize database object
            await this.createDatabase()

            // initialize users table
            await this.initializeUsersTable();

            self.storage.set('is_database_initialized', true);
            resolve(true);
        })

    }

    initialize() {

        return new Promise(resolve => {
            self.storage.get('is_database_initialized').then(async v => {
                if (!v) {
                    await this.initializeDatabase();
                    resolve(true);
                } else {
                    resolve(true);
                }
            })
        })

    }

    async createDatabase(){
        return new Promise( async resolve => {
            let _db = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
            self.db = browserDBInstance(_db);
            self.msg = 'Database initialized';
            resolve();
        })

    }

    async initializeUsersTable() {

        return new Promise(resolve => {
            // create statement
            var sql = "CREATE TABLE IF NOT EXISTS users(";
            sql += "id INTEGER PRIMARY KEY, ";
            sql += "avatar TEXT, "
            sql += "email TEXT, "
            sql += "name TEXT, "
            sql += "token TEXT, "
            sql += "fcm_token, "
            sql += "active INTEGER DEFAULT 0 ";
            sql += ")";
            console.log({sql});


            self.msg = 'Initializing Users ...';
            resolve(this.execute(sql, []));
        })

    }

    updateUserInDatabase(_user, multiple = false) {

        return new Promise(async resolve => {
            // check if user is already present in our local database, if not, create and fetch his data
            // check if user exist in database, if not create it else update it
            var sql = "UPDATE users SET name = ? where id = ?";
            var values = [
                _user.name,
                _user.id,
            ];

            await this.execute(sql, values);
            resolve(await this.getActiveUser());


        })
    }

    updateUserFcmTokenInDatabase(_user, multiple = false) {

        return new Promise(async resolve => {
            // check if user is already present in our local database, if not, create and fetch his data
            // check if user exist in database, if not create it else update it
            var sql = "UPDATE users SET fcm_token = ? where id = ?";
            var values = [
                _user.fcm_token,
                _user.id,
            ];

            await this.execute(sql, values);
            resolve(await this.getActiveUser());


        })
    }

    setUserInDatabase(_user, multiple = false) {

        return new Promise(async resolve => {
            // check if user is already present in our local database, if not, create and fetch his data
            // check if user exist in database, if not create it else update it
            var sql = "INSERT OR REPLACE INTO users(";

            sql += "id, ";
            sql += "avatar, "
            sql += "email, "
            sql += "name, "
            sql += "token, "
            sql += "fcm_token "

            sql += ") ";

            sql += "VALUES (";

            sql += "?, ";
            sql += "?, ";
            sql += "?, ";
            sql += "?, ";
            sql += "?, ";
            sql += "? ";
            sql += ")";

            var values = [
                _user.id,
                _user.avatar,
                _user.email,
                _user.name,
                _user.token,
                _user.fcm_token
            ];

            await this.execute(sql, values);

            if (_user.token) {

                let sql3 = "UPDATE users SET active = ?";
                let values3 = [0];
                await this.execute(sql3, values3);


                if(!multiple){
                    let sql2 = "UPDATE users SET active = ? where id = ?";
                    let values2 = [1, _user.id];
                    await this.execute(sql2, values2);
                }


            }

            if(!multiple){
                resolve(await this.getActiveUser());
            }else{
                resolve(true);
            }


        })
    }

    async getCurrentUserAuthorizationToken() {
        return new Promise(async resolve => {
            let user_id = await this.getActiveUserId();
            console.log(user_id, "USER ID FROM CURRENT USERS");
            if(!user_id){
                resolve(null);
                return;
            }
            let sql = 'SELECT token FROM users where id = ? limit 1';
            let values = [user_id];

            let d = await this.execute(sql, values);
            // self.utility.presentToast(d);
            if (!d) {
                resolve(null);
                return;
            }
            // var data = d as any[];
            const data = this.getRows(d);
            if (data.length > 0) {
                resolve(data[0]['token']);
            } else {
                resolve(null);
            }

        })
    }

    async setUserActiveById(id) {

        return new Promise(async resolve => {

            let sql3 = "UPDATE users SET active = ?";
            let values3 = [0];
            await self.execute(sql3, values3);

            let sql2 = "UPDATE users SET active = ? where id = ?";
            let values2 = [ 1, id];
            await self.execute(sql2, values2);

            resolve(self.getUserById(id))

        })

    }

    async getUserById(id) {

        return new Promise(async resolve => {
            let sql = "SELECT * FROM users where id = ?";
            let values = [id];

            let d = await self.execute(sql, values);
            if (!d) {
                resolve(null);
            }
            // var data = d as any[];
            const data = self.getRows(d);
            if (data.length > 0) {
                let id = data[0];
                resolve(id);
            } else {
                resolve(null);
            }

        })

    }

    async getActiveUserId() {

        return new Promise(async resolve => {
            let sql = "SELECT id FROM users where active = ?";
            let values = [1];

            let d = await this.execute(sql, values);
            if (!d) {
                resolve(null);
            }
            // var data = d as any[];
            const data = this.getRows(d);
            if (data.length > 0) {
                let id = data[0]["id"];
                resolve(id);
            } else {
                resolve(null);
            }

        })

    }

    async getActiveUser() {
        return new Promise(async resolve => {
            let sql = "SELECT * FROM users where active = ? ";
            let values = [1];

            let d = await this.execute(sql, values);
            // var data = d as any[];
            const data = this.getRows(d);
            if (data.length > 0) {
                var user = data[0];
                resolve(user);
            } else {
                resolve(null);
            }

        })
    }

    async getAllUsers() {
        return new Promise(async resolve => {
            let sql = "SELECT * FROM users";
            let values = [];

            let d = await self.execute(sql, values);
            // var data = d as any[];
            const data = self.getRows(d);
            if (data.length > 0) {
                var users = data;
                resolve(users);
            } else {
                resolve([]);
            }

        })
    }

    setLogout() {

        return new Promise(async resolve => {
            let user_id = await this.getActiveUserId();

            let sql = "UPDATE users SET token = ?, active = ? where id = ?";
            let values = [null, 0, user_id];

            let d = await this.execute(sql, values);
            // var data = d as any[];
            const data = this.getRows(d);
            if (data.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }


        })

    }

    execute(sql, params) {
        return new Promise(async resolve => {

            if (!this.db) {
                // initialize database object
                await this.createDatabase()
            }

            // console.log(sql);
            // if(self.platform.is('cordova')){
            // console.log(params);
            self.db.executeSql(sql, params).then(response => {
                resolve(response);
            }).catch(err => {
                console.error(err);
                resolve(null);
            })


        })
    }


    setValue(k, v) {
        return new Promise(resolve => {
            self.storage.set(k, v).then(() => {
                resolve({ k: v });
            });
        })

    }

    getValue(k) {
        return new Promise(resolve => {
            self.storage.get(k).then(r => {
                resolve(r);
            });
        })

    }

    getRows(data) {
        var items = []
        for (let i = 0; i < data.rows.length; i++) {
            let item = data.rows.item(i);

            items.push(item);
        }

        return items;
    }

    async getToken(){
        const token = await this.getCurrentUserAuthorizationToken();
        console.log({token})
        return token
    }



}

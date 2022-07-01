export const browserDBInstance = (db) => {

    return {
        executeSql: (sql, data) => {
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(sql, data, (tx, rs) => {
                        resolve(rs)
                    });
                }, err => reject(err));
            })
        },
        sqlBatch: (arr) => {
            return new Promise((r, rr) => {
                let batch = [];
                db.transaction((tx) => {
                    for (let i = 0; i < arr.length; i++) {
                        batch.push(new Promise((resolve, reject) => {
                            tx.executeSql(arr[i], [], () => { resolve(true) })
                        }))
                        Promise.all(batch).then(() => r(true));
                    }
                });
            })
        }
    }
}

export class SQLiteObject {


    constructor(db) {
        self.db = db;
    };

    executeSql(queryStatement, params = []) {
        return new Promise((resolve, reject) => {
            self.db.transaction((tx) => {
                tx.executeSql(queryStatement, params,
                    (tx, result) => {
                        resolve(result)
                    },
                    (error) => reject(error));
            });
        });
    }
}
//
// export class SQLiteMock {
//     public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
//         var db = (<any>window).openDatabase('mydb', '', 'my first database', 2 * 1024 * 1024);
//
//         return new Promise((resolve, reject) => {
//             resolve(new SQLiteObject(db));
//         });
//     }
// }

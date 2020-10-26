class WebSQL{
    
    db;

    constructor(window){
        console.log(window);
        this.db = openDatabase('EHR', '1.0', 'EHR DB', 2 * 1024 * 1024);
    }

    insert(table,doc){
        return new Promise((resolve,reject)=>{
            if(!this.db){
                reject('Database is not setup correctly');
                return;
            }

            // doc = serialize(doc);

            // let keys = [];
            // doc.forEach((d)=>keys.push(d[0]));
            // keys = keys.join(', ');
            // let values = [];
            // doc.forEach((d)=>values.push(d[1]));
            // let q = [];
            // doc.forEach((d)=>q.push('?'));
            // q = q.join(', ');

            const id = new Date().getTime();

            this.db.transaction(function (tx) {   
                
                console.log(`CREATE TABLE IF NOT EXISTS ${table} (id,doc)`);
                console.log(`INSERT INTO ${table} (id,doc) VALUES (${id},${doc})`);

                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${table} (id,doc)`);
                tx.executeSql(`INSERT INTO ${table} (id,doc) VALUES (?,?)`, [id,JSON.stringify(doc)],(tx,result)=>{
                    resolve(result);
                },(tx,error)=>{
                    reject(error);
                });
            });
        });
    }

    getById(table,id){
        return new Promise((resolve,reject)=>{
            if(!this.db){
                reject('Database is not setup correctly');
                return;
            }
            this.db.transaction(function (tx) { 
                tx.executeSql(`SELECT * FROM ${table} WHERE id = ?`, [id], function (tx, results) { 
                    const result = [];
                    for (let i = 0; i < results.rows.length; i++) { 
                        result.push(results.rows.item(i)); 
                    }
                    if(result.length > 0) 
                        resolve(result);
                    
                }, function(tx,error){
                    reject(error);
                }); 
            });
        });
    }

    getAll(table){
        return new Promise((resolve,reject)=>{
            if(!this.db){
                reject('Database is not setup correctly');
                return;
            }
            this.db.transaction(function (tx) { 
                tx.executeSql(`SELECT * FROM ${table}`, [], function (tx, results) { 
                    const result = [];
                    for (let i = 0; i < results.rows.length; i++) { 
                        const item = results.rows.item(i);
                        result.push({id:item.id,doc:JSON.parse(item.doc)}); 
                    } 
                    resolve(result);
                }, function(tx,error){
                    reject(error);
                }); 
            });
        });
    }

    remove(table,id){
        return new Promise((resolve,reject)=>{
            if(!this.db){
                reject('Database is not setup correctly');
                return;
            }
            this.db.transaction(function (tx) {
                tx.executeSql(`DELETE FROM ${table} WHERE id = ?`, [id],(tx,result)=>{
                    resolve(result);
                },(tx,error)=>{
                    reject(error);
                });
            });
        });
    }

    removeAll(table){
        return new Promise((resolve,reject)=>{
            if(!this.db){
                reject('Database is not setup correctly');
                return;
            }
            this.db.transaction(function (tx) {
                tx.executeSql(`DELETE FROM ${table}`, [],(tx,result)=>{
                    resolve(result);
                },(tx,error)=>{
                    reject(error);
                });
            });
        });
    }
}

let webSQL = null;

export default function getWebSQL(window){
    if(webSQL){
        return webSQL;
    }
    webSQL = new WebSQL(window);
    return webSQL;
};
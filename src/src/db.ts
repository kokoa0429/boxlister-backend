import mongodb = require("mongodb");

const assert = require('assert')
const MongoClient = mongodb.MongoClient

module.exports = class Database {

    connect () {
        MongoClient.connect('mongodb://boxlister:password@mongo:27017/test', (err, client) => {
            if (err) throw err;
            const db = client.db("boxlister")
            this.insertDocuments(db, () => {
                client.close()
            })
        })
    }


    insertDocuments(db :any, callback:any){
        const documents = [
            { a: 1 },
            { a: 2 },
            { a: 3 }
        ]
        // myDBデータベースのdocumentsコ レクション に対して
        // ドキュメントを3つ追加します
        db.collection('documents').insertMany(documents, (err:any, result:any) => {
            // insert結果の確認
            assert.equal(err, null)
            assert.equal(3, result.result.n)
            assert.equal(3, result.ops.length)

            console.log("Inserted 3 documents into the collection")
            callback(result)
        })
    }

}


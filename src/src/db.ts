import mongodb = require("mongodb");
import express = require('express')

const assert = require('assert')
const MongoClient = mongodb.MongoClient

const uri = 'mongodb://boxlister:password@mongo:27017/test'

let mongoDB :mongodb.Db

module.exports = class Database {

    async connect () {
        await MongoClient.connect(uri, (err, client) => {
            if (err) throw err;
            mongoDB = client.db("boxlister")
        })
    }

    getAllBoxes (resp: express.Response) {
        mongoDB.collection("boxes").find().toArray((err,res) => {
            resp.send(res)
        })
    }

    getBox (id : string, resp: express.Response) {
        mongoDB.collection('boxes').findOne({ _id: new mongodb.ObjectID(id)},(err, res) => {
            resp.send(res)
        })
    }

    setBox (id : string, obj: any, resp: express.Response) {
        mongoDB.collection('boxes').updateOne({ _id: new mongodb.ObjectID(id)}, {$set: obj}, (err, res) => {
            this.getAllBoxes(resp)
        })
    }

    deleteBox (id : string, resp: express.Response) {
        mongoDB.collection('boxes').remove({ _id: new mongodb.ObjectID(id)}, (err, res) => {
            this.getAllBoxes(resp)
        })
    }

    newBox (resp: express.Response){
        const documents =  
        { 
            data: { 
                name : "新しい箱",
                summary: "",
                items: [
                    {
                        id: "76c89a",
                        name: "",
                        amount: 0
                    }
                ]
            } 
        }

        mongoDB.collection('boxes').insert(documents, (err:any, result:any) => {
            this.getAllBoxes(resp)
        })
    }

}


import express = require('express')

const Database = require("./db")

const db = new Database()
db.connect()

const app: express.Express = express()

// CORSの許可
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GetとPostのルーティング
const router: express.Router = express.Router()

router.get('/box', (req:express.Request, res:express.Response) => {
  db.insertDocuments()
  res.send(req.query)
})

router.post('/box/new', (req:express.Request, res:express.Response) => {
  res.send(req.body)
})

router.post('/box/{id}', (req:express.Request, res:express.Response) => {
  res.send(req.query)
})


app.use(router)
app.listen(3000,()=>{ console.log('Example app listening on port 3000!"!!') })
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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router: express.Router = express.Router()

router.get('/box', (req:express.Request, res:express.Response) => {
  db.getAllBoxes(res)
})

router.get('/box/new', (req:express.Request, res:express.Response) => {
  db.newBox(res)
})

router.get('/box/:id', (req:express.Request, res:express.Response) => {
  db.getBox(req.params.id, res)
})

router.post('/box/:id', (req:express.Request, res:express.Response) => {
  db.setBox(req.params.id, req.body, res)
})

router.delete('/box/:id', (req:express.Request, res:express.Response) => {
  db.deleteBox(req.params.id, res)
})

app.use(router)
app.listen(3000,()=>{ console.log('Started') })
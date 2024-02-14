const express = require('express')
const multer = require('multer')
const cors = require('cors')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  }
})

const upload = multer({
  storage: storage
})

const app = express()
app.use(cors())

const port = 3000

// test คือชื่อ field ที่เราส่ง upload มา
app.post('/upload', upload.single('test'), (req, res) => {
  res.send(req.file)
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
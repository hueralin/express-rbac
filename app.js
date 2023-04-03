const express = require('express')
const dotenv = require('dotenv')
// 加载环境变量
dotenv.config()
const router = require('./router')

const app = express()

// 解析 body 中的 json 数据
app.use(express.json())
// 解析 body 中的 formData 数据
app.use(express.urlencoded())

// 设置模板引擎
app.set('view engine', 'ejs')
app.set('views', './views')

// 设置路由
app.use('/', router)
// 404 handler
app.use((req, res, next) => {
    res.status(404).send('404 Not Found!')
})
// err handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(process.env.APP_PORT, () => {
    console.log('server running on port ', process.env.APP_PORT)
})

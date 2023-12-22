import express from 'express'
import session from 'express-session'
import {
    createGoogleUser,
    createOrderInfo,
    createProduct,
    createUser,
    deleteAllProducts,
    emailExisted,
    getProvider,
    getVariantsStock,
    paymentRecord,
    paymentTransaction,
    productDetails,
    productSearch,
    productsAmount,
    showAccessoriesProducts,
    showAllProducts,
    showMenProducts,
    showWomenProducts,
    updateVariants,
    userGoogleSignIn,
    userSignIn
} from './src/stylishDB/stylishDB.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import options from './src/swagger.json' assert {type: 'json'}
import multer from 'multer'
import AWS from 'aws-sdk'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import * as dotenv from 'dotenv'
import { createClient } from 'redis'
import { requestHeaders, requestTokenValid } from './src/middleware/middleWare.js'
import jwt from 'jsonwebtoken'
import engine from 'ejs-locals'
import axios from 'axios'
import passport from 'passport'
import './src/middleware/passport_config.js'
import cors from 'cors'


const redisClient = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect()

dotenv.config()

//multer upload to s3
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only jpg and png formats are allowed!'), false)
        }
        cb(null, true)
    }
})

//AWS S3
const s3 = new S3Client({
    region: process.env.s3_bucket_region,
    credentials: {
        accessKeyId: process.env.aws_access_key_id,
        secretAccessKey: process.env.aws_secret_access_key
    }
})

function isLoggedIn(req, res, next) {
    read.user ? next() : res.status(401)
}

function setPaging({ data }) {
    const paging = {}
    let lastPage = 0
    for (let i = 0; i < data.length; i += 6) {
        const key = Math.floor(i / 6)
        const products = data.slice(i, i + 6)
        if (key < Math.ceil(data.length / 6) - 1) {
            paging[key] = { data: [...products], next_paging: key + 1 }
        } else {
            paging[key] = { data: [...products] }
        }
        lastPage = key
    }
    return paging
}

async function cacheProduct(key, callback) {
    const value = await redisClient.get(key)
    if (value != null) {
        console.log("Cache hit!")
        const productData = JSON.parse(value)
        return productData
    } else {
        console.log("No cached")
        const productData = { data: [...await callback] }
        await redisClient.set(key, JSON.stringify(productData))
        return productData
    }
}

const app = express()

//ejs
app.engine('ejs', engine)
app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('src'))
app.use(express.static('.well-known'))


//swagger API
const specs = swaggerJSDoc(options)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))

app.get('/', (req, res) => {
    if (typeof req.query.token !== 'undefined') {
        console.log("true")
    }
    res.send("hello")
})


app.post('/api/1.0/createProduct', upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'images', maxCount: 4 }]), async (req, res) => {
    let productData = req.body
    productData = JSON.parse(productData.productInfo)
    if (await productsAmount() > 150) {
        res.status(400).send("The number of products has reached the limit and no more can be added.")
    } else {
        //At least one main_image is required
        if (req.files.main_image) {
            //At least one image is required
            if (req.files.images) {
                const timeStampKey = Date.now().toString()
                //S3 upload
                try {
                    //Process main_image and images
                    Object.entries(req.files).forEach(([key, value]) => {
                        //Process every single image in images
                        value.forEach(element => {
                            const command = new PutObjectCommand({
                                Bucket: process.env.bucket_name,
                                Key: `${timeStampKey}/${key}/${value.indexOf(element)}`,
                                Body: element.buffer,
                                ContentType: element.mimetype
                            })
                            s3.send(command).then(data => {
                                console.log(`https://${process.env.bucket_name}.s3.${process.env.s3_bucket_region}.amazonaws.com/${timeStampKey}/${key}/${value.indexOf(element)}`)

                            }).catch(error => {
                                res.status(500).send(`Error uploading : ${error}`)
                            })
                        })
                    })
                } catch (error) {
                    res.status(500).send(`Error uploading : ${error}`)
                }

                const result = await createProduct(productData)
                redisClient.flushAll()
                res.status(200).send(`Image and product successfully uploaded.`)
            } else {
                res.status(400).send("At least one image is required")
            }

        } else {
            res.status(400).send(`At least one main_image is required`)
        }
    }

})


app.get('/api/1.0/products/all', async (req, res) => {
    const productData = await cacheProduct('all', await showAllProducts())
    const { paging } = req.query
    if (!paging) {
        res.status(200).send(setPaging(productData)[0])
    } else {
        res.status(200).send(setPaging(productData)[paging])
    }

})

app.get('/api/1.0/products/women', async (req, res) => {
    const productData = await cacheProduct('women', await showWomenProducts())
    const { paging } = req.query
    if (!paging) {
        res.status(200).send(setPaging(productData)[0])
    } else {
        res.status(200).send(setPaging(productData)[paging])
    }
})

app.get('/api/1.0/products/men', async (req, res) => {
    const productData = await cacheProduct('men', await showMenProducts())
    const { paging } = req.query
    if (!paging) {
        res.status(200).send(setPaging(productData)[0])
    } else {
        res.status(200).send(setPaging(productData)[paging])
    }
})

app.get('/api/1.0/products/accessories', async (req, res) => {
    const productData = await cacheProduct('accessories', await showAccessoriesProducts())
    const { paging } = req.query
    if (!paging) {
        res.status(200).send(setPaging(productData)[0])
    } else {
        res.status(200).send(setPaging(productData)[paging])
    }
})

app.get('/api/1.0/products/search', async (req, res) => {
    //error500未完成
    const { keyword, paging } = req.query
    const result = await productSearch(keyword)
    if (result.length > 0) {
        const productData = { data: [...result] }
        if (!paging) {
            res.status(200).send(setPaging(productData)[0])
        } else {
            res.status(200).send(setPaging(productData)[paging])
        }

    } else {
        res.status(400).send("Can not found product.")
    }
})

app.get('/api/1.0/products/details', async (req, res) => {
    //error500未完成
    const { id } = req.query
    const value = await redisClient.hGet('details', id)
    if (value != null) {
        console.log("Cache hit!")
        const result = JSON.parse(value)
        const productData = { data: result[0] }
        res.status(200).send(productData)
    } else {
        console.log("No cached")
        const result = await productDetails(id)
        if (result.length > 0) {
            await redisClient.hSet("details", id, JSON.stringify(result))
            const productData = { data: result[0] }
            res.status(200).send(productData)
        } else {
            res.status(400).send("Can not found product.")
        }
    }
})

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
//Regex password
const uppercaseRegex = /[A-Z]/
const lowercaseRegex = /[a-z]/
const numberRegex = /[0-9]/
const symbolRegex = /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/|]/

//sign up interface
app.get('/user/signup', (req, res) => {
    const google_clientID = process.env.google_clientID
    const hostname = process.env.hostname
    const nginx_dir = process.env.nginx_dir
    res.render('signup', { hostname, google_clientID, nginx_dir })
})

//sign in interface
app.get('/user/signin', (req, res) => {
    const google_clientID = process.env.google_clientID
    const hostname = process.env.hostname
    const nginx_dir = process.env.nginx_dir
    res.render('signin', { hostname, google_clientID, nginx_dir })
})




/*
1. email不能重複
2. password hashing salt
3. 確認regular expressions符合範例
*/
app.post('/api/1.0/user/signup', requestHeaders, async (req, res) => {
    const { name, email, password } = req.body
    let nameValidStatus = false
    let pwdValidStatus = false
    let emailValidStatus = false

    if (name.length > 0) {
        nameValidStatus = true
    }

    let pwdValidCount = 0
    if (uppercaseRegex.test(password)) {
        pwdValidCount++
    }
    if (lowercaseRegex.test(password)) {
        pwdValidCount++
    }
    if (numberRegex.test(password)) {
        pwdValidCount++
    }
    if (symbolRegex.test(password)) {
        pwdValidCount++
    }
    if (pwdValidCount >= 3) {
        pwdValidStatus = true
    }

    if (emailRegex.test(email)) {
        if (await emailExisted(email)) {
            res.status(409).send("Email already exists")

        } else {
            emailValidStatus = true
            //改回密碼格式驗證 未完成
            if (nameValidStatus && emailValidStatus) {
                //暫時值 未完成
                const provider = "native"
                const picture = "https://picsum.photos/id/237/200/300"
                const [userId, hashedPassword] = await createUser(name, email, password, provider, picture)
                //Generate JWT
                const payload = {
                    userID: userId,
                    provider: provider,
                    name: name,
                    email: email,
                    picture: picture
                }
                const expireTimeSec = 60 * 60
                const tokenExpiration = Math.floor(Date.now() / 1000) + expireTimeSec
                const token = jwt.sign({ payload, exp: tokenExpiration }, process.env.jwt_secret_key)
                res.status(200).json({
                    "data": {
                        "access_token": token,
                        "access_expired": expireTimeSec,
                        "user": {
                            "id": userId,
                            "provider": provider,
                            "name": name,
                            "email": email,
                            "picture": picture
                        }
                    }
                })
            } else {
                res.status(400).send("Invalid password or email format.")
            }
        }
    }

})

app.post('/api/1.0/user/signin', requestHeaders, async (req, res) => {
    const { email, password, provider } = req.body
    if (!email || !password || !provider) {
        res.status(400).send("Missing required fields in the request body.")
    } else {
        const [id, name, picture] = await userSignIn(email, password)
        try {
            if (id) {
                //Generate JWT token
                const payload = {
                    userID: id,
                    provider: provider,
                    name: name,
                    email: email,
                    picture: picture
                }
                const expireTimeSec = 60 * 60
                const tokenExpiration = Math.floor(Date.now() / 1000) + expireTimeSec
                const token = jwt.sign({ payload, exp: tokenExpiration }, process.env.jwt_secret_key)
                res.status(200).json(
                    {
                        "data": {
                            "access_token": token,
                            "access_expired": expireTimeSec,
                            "user": {
                                "id": id,
                                "provider": provider,
                                "name": name,
                                "email": email,
                                "picture": picture
                            }
                        }
                    }
                )
            } else (
                res.status(403).send("Wrong email or password.")
            )
        } catch (err) {
            res.status(500).send(err)
        }

    }


})

app.post('/api/1.0/user/verify', requestTokenValid, (req, res) => {
    const payload = req.payload
    console.log(payload)
    res.status(200).send("pass")
})

app.get('/api/1.0/user/profile', requestTokenValid, async (req, res) => {
    //const token = req.token
    const payload = req.payload
    res.status(200).json({ "data": payload })
})

app.post('/api/1.0/order/checkout', requestTokenValid, async (req, res) => {
    const token = req.token
    const payload = req.payload
    try {
        const checkOutDetails = req.body
        /*
            存入資料庫
        */
        const orderId = (Math.floor(Math.random() * 9e9) + 1e9).toString()

        const userId = payload.userID
        const amount = checkOutDetails.order.total
        const orderStatus = "未付款"
        const shippingAddress = checkOutDetails.order.recipient.address
        const payment = checkOutDetails.order.payment
        const recipient = checkOutDetails.order.recipient
        const purchasedItems = checkOutDetails.order.list
        
        const createResult = await createOrderInfo(orderId, userId, amount, orderStatus, shippingAddress, payment, recipient, purchasedItems)

        const { prime } = checkOutDetails
        const partner_key = process.env.partner_key
        const merchant_ID = process.env.merchant_ID
        //未完成 post_data details部分放整個purchasedItems不會過
        const post_data = {
            "prime": prime,
            "partner_key": partner_key,
            "merchant_id": merchant_ID,
            "details": "test",
            "amount": amount,
            "currency": "TWD",
            "order_number": orderId,
            "cardholder": {
                "phone_number": "+886923456789",
                "name": "王小明",
                "email": "LittleMing@Wang.com",
                "zip_code": "100",
                "address": "台北市天龍區芝麻街1號1樓",
                "national_id": "A123456789"
            },
            "remember": true
        }
        const post_options = {
            method: 'POST',
            url: 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': partner_key
            },
            data: post_data
        }
        await axios(post_options)
            .then(response => {
                const tapPayRes = response.data
                //payment success
                if (tapPayRes.status == 0) {
                    const { order_number, bank_transaction_id, bank_order_number, currency } = tapPayRes
                    //If the payment is successful, turn unpaid to paid
                    //turnUnpaid2Paid(order_number)
                    const amountFromTapPay = tapPayRes.amount
                    const transaction_time = new Date(tapPayRes.transaction_time_millis)
                    const options = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    };
                    const formattedDate = transaction_time.toLocaleDateString(undefined, options)
                    const pt = paymentTransaction(userId, order_number, bank_transaction_id, amountFromTapPay, currency, formattedDate)

                    pt.then(result => {
                        //if paymentTransaction was successful
                        if (result) {
                            //decrease stock from variant
                            purchasedItems.map(item => {
                                const variantsStock = getVariantsStock(item.id)
                                variantsStock.then(result => {
                                    const variants = result[0].variants
                                    
                                    const size = item.size
                                    const color = item.color.code
                                    
                                    const updatedVariants = variants.map(variant => {
                                        if (variant.size === size && variant.color_code === color) {
                                            return { ...variant, stock: variant.stock - item.qty }
                                        }else{
                                            
                                            return variant
                                        }
                                        
                                    })
                                    const uv = updateVariants(updatedVariants, item.id)
                                    uv.then(result => {redisClient.flushAll()})
                                    
                                })
                            })


                            //if paymentTransaction was fail
                        } else {

                        }
                    })

                    res.status(200).json({
                        "data": {
                            "orderId": orderId
                        }
                    })
                } else {
                    console.log(tapPayRes.msg)
                    res.status(400).send(tapPayRes.status)
                }
            })
            .catch(error => {
                console.log("error: ", error)
                res.status(500).send(error)
            })
    } catch (err) {
        console.log("err: ", err)
        res.status(500).send(err)
    }

})

app.get('/admin/checkout.html', (req, res) => {
    const token = req.query.token

    const app_ID = process.env.app_ID
    const app_key = process.env.app_key
    const google_clientID = process.env.google_clientID
    const nginx_dir = process.env.nginx_dir
    res.render("tapPay", { app_ID, app_key, google_clientID, token, nginx_dir })
})

app.get('/admin/pay/success', (req, res) => {
    res.status(200).json({
        "data": {
            "number": req.query.orderId
        }
    })
})


app.use(session({
    secret: process.env.jwt_secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: `${process.env.nginx_dir}api/1.0/user/google/signin`,
    failureRedirect: `${process.env.nginx_dir}auth/google/failure`
}))


app.get('/auth/google/failure', (req, res) => {
    res.send("Registration failed")
})

//Google sign in/up
app.get('/api/1.0/user/google/signin', async (req, res) => {
    const { name, email, picture } = req.user
    if (await emailExisted(email)) {
        const provider = await getProvider(email)
        if (provider == 'google') {
            console.log("google 登入成功")
            const [id, name, picture] = await userGoogleSignIn(email)
            const payload = {
                userID: id,
                provider: provider,
                name: name,
                email: email,
                picture: picture
            }
            const expireTimeSec = 60 * 60
            const tokenExpiration = Math.floor(Date.now() / 1000) + expireTimeSec
            const token = jwt.sign({ payload, exp: tokenExpiration }, process.env.jwt_secret_key)

            res.redirect(`${process.env.nginx_dir}admin/checkout.html?token=${token}`)
            /*
            res.status(200).json(
                {
                    "data": {
                        "access_token": token,
                        "access_expired": expireTimeSec,
                        "user": {
                            "id": id,
                            "provider": provider,
                            "name": name,
                            "email": email,
                            "picture": picture
                        }
                    }
                }
            )*/
        } else {
            res.status(400).send("請用native帳號密碼登入")
        }

    } else {
        const [userId, provider] = await createGoogleUser(name, email, picture)
        const payload = {
            userID: userId,
            provider: provider,
            name: name,
            email: email,
            picture: picture
        }
        const expireTimeSec = 60 * 60
        const tokenExpiration = Math.floor(Date.now() / 1000) + expireTimeSec
        const token = jwt.sign({ payload, exp: tokenExpiration }, process.env.jwt_secret_key)
        console.log("google 註冊成功")
        res.status(200).json({
            "data": {
                "access_token": token,
                "access_expired": expireTimeSec,
                "user": {
                    "id": userId,
                    "provider": provider,
                    "name": name,
                    "email": email,
                    "picture": picture
                }
            }
        })
    }
})


//for test--------------------------------------------------------

//只新增商品資訊
app.post('/createProductInfo', async (req, res) => {
    const productData = req.body
    const result = await createProduct(productData)
    res.send("done")
})

//只新增商品圖片
app.post("/upload", upload.single("image"), (req, res) => {
    res.send("Image Uploaded")
})

app.get('/api/1.0.0/products/delete', async (req, res) => {
    await deleteAllProducts()
    res.end()
})


app.get('/fetchData', (req, res) => {
    // axios.get(
        
    // )
    res.render('chart')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
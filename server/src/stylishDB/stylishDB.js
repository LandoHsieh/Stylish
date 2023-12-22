import mysql from 'mysql2'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}).promise()

const connection = await pool.getConnection()

//Product--------------------------------------------------------

export async function createProduct(productData) {
    const { id, category, title, description, price, texture, wash, place, note, story, colors, sizes, variants, main_image, images } = productData
    const result = await pool.query(
        "insert into Product (id, category, title, description, price, texture, wash, place, note, story, colors, sizes, variants, main_image, images) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, category, title, description, price, texture, wash, place, note, story, JSON.stringify(colors), JSON.stringify(sizes), JSON.stringify(variants), main_image, JSON.stringify(images)])
    return result[0]
}

export async function showAllProducts() {
    const result = await pool.query("select * from Product")
    return result[0]
}

export async function showWomenProducts() {
    const result = await pool.query("select * from Product where category='women'")
    return result[0]
}

export async function showMenProducts() {
    const result = await pool.query("select * from Product where category='men'")
    return result[0]
}

export async function showAccessoriesProducts() {
    const result = await pool.query("select * from Product where category='accessories'")
    return result[0]
}

export async function deleteAllProducts() {
    const result = await pool.query("delete from Product")
}

export async function productSearch(keyword) {
    const result = await pool.query("select * from Product where title like ?", [`%${keyword}%`])
    return result[0]
}

export async function productDetails(id) {
    const result = await pool.query("select * from Product where id = ?", [id])
    return result[0]
}

export async function productsAmount() {
    const result = await pool.query("select count(*) from Product")
    console.log(result[0][0]['count(*)'])
}

//User ----------------------------------------------------------------

export async function emailExisted(email){
    const result = await pool.query("select * from User where email = ?", [email])
    if(result[0].length > 0){
        return(true)
    }else{
        return(false)
    }
}

export async function getProvider(email) {
    const result = await pool.query("select * from User where email = ?", [email])
    return result[0][0].provider
}

//provider暫預設為native
export async function createUser(name, email, password, provider, picture){
    const userAmount = await pool.query("select count(*) from User")
    const userId = userAmount[0][0]['count(*)'] + 1
    
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const role = 'user'
    const result = await pool.query("insert into User (id, provider, name, email, picture, password, role) values (?, ?, ?, ?, ?, ?, ?)", [userId, provider, name, email, picture, hashedPassword, role])
    
    return [userId, hashedPassword]

}

export async function createGoogleUser(name, email, picture){
    const provider = "google"
    const password = null
    const userAmount = await pool.query("select count(*) from User")
    const userId = userAmount[0][0]['count(*)'] + 1
    const role = 'user'
    const result = await pool.query("insert into User (id, provider, name, email, picture, password, role) values (?, ?, ?, ?, ?, ?, ?)", [userId, provider, name, email, picture, password, role])
    return [userId, provider]
}

export async function userSignIn(email, password){
    const result = await pool.query("select * from User where email = ?", [email])
    if(result[0].length == 1){
        const hashedPassword = result[0][0].password
        const passwordValid = bcrypt.compareSync(password, hashedPassword)
        if(passwordValid){
            return [result[0][0].id, result[0][0].name, result[0][0].picture]
        }else{
            return []
        }
    }else{
        return result[0]
    }
}

export async function userGoogleSignIn(email){
    const result = await pool.query("select * from User where email = ?", [email])
    return [result[0][0].id, result[0][0].name, result[0][0].picture]
}

//Order information----------------------------------------------------------------

export async function createOrderInfo(orderID, userID, amount, orderStatus, shippingAddress, payment, recipient, purchasedItems){
    const result = await pool.query("insert into orderInfo (OrderID, UserID, Amount, OrderStatus, ShippingAddress, Payment, Recipient, PurchasedItems) values (?, ?, ?, ?, ?, ?, ?, ?)", 
    [orderID, userID, amount, orderStatus, shippingAddress, payment, JSON.stringify(recipient), JSON.stringify(purchasedItems)])

    return result[0]
}

export async function paymentTransaction(userId, order_number, bank_transaction_id, amount, currency, transaction_time){
    try {
        //await connection.beginTransaction()
        const turnUnpaid2Paid = await pool.query("update orderInfo set OrderStatus='已付款' where OrderID=?", [order_number])
    
        const paymentRecord = await pool.query("insert into paymentRecord (UserID, OrderID, BankTransactionID, Amount, Currency, TransactionTime) values (?, ?, ?, ?, ?, ?)",
        [userId, order_number, bank_transaction_id, amount, currency, transaction_time])
        //await connection.commit()
        return true
    }catch (error){
        console.error("Transaction error: ", error)
        //await connection.rollback()
        return false
    }
}

export async function getVariantsStock(product_id){
    const result = await pool.query("select variants from Product where id = ?", [product_id])
    return result[0]
}

export async function updateVariants(updatedVariants, product_id){
    const result = await pool.query("update Product set variants= ? where id = ?", [JSON.stringify(updatedVariants), product_id])
    return result[0]
}


export async function paymentRecord(userId, order_number, bank_transaction_id, amount, currency, transaction_time){
    const result = await pool.query("insert into paymentRecord (UserID, OrderID, BankTransactionID, Amount, Currency, TransactionTime) values (?, ?, ?, ?, ?, ?)",
     [userId, order_number, bank_transaction_id, amount, currency, transaction_time])
     return result[0]
}

export async function order2payment(){

}


//----------------------------------------------------------------
/* 資料庫正規化
export async function createNewProduct(productData){
    const { id, category, title, description, price, texture, wash, place, note, story, colors, sizes, variants, main_image, images } = productData
    await pool.query("insert into Product (id, category, title, description, price, texture, wash, place, note, story, sizes, main_image, images) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, category, title, description, price, texture, wash, place, note, story, JSON.stringify(sizes), main_image, JSON.stringify(images)])

}
*/

async function test() {
    const result = await pool.query()

    console.log(result[0][0].id)
}

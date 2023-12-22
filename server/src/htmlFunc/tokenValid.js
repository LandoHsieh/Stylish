import jwt from 'jsonwebtoken'
function accessTokenValid(token){
    jwt.verify(token, '<%=jwt_secret_key%>', async (err, payload) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                alert("JWT token expired")
                return false    
            } else if (err instanceof jwt.JsonWebTokenError) {
                alert("Invalid JWT token")
                return false
            } else {
                alert(err)
                return false
            }
        } else {
            alert("success")
            
        }
    })
}
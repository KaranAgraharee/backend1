import jwt from "jsonwebtoken"


export const ensureAuthenticated = (req, res, next) =>{
    const Auth = req.header['authorization']
    if(!Auth){
        return res.status(403).json({
            message:'unauthorized, JWT token is require'
        })
    }
    try {
        const decoded = jwt.verify(Auth_Token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({
            message:'unauthorized, JWT token is require'
        })
    }
}



let ipName = null

const blockReqs = (req,res,next) => {
     
    if(ipName === null){
        ipName = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        next()
    }
    else if(ipName !== null){
        const reqIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        if(reqIP === '::1'){
            next()
        }
        else{
            res.status(401).send()
        }
    }  
}


module.exports = {
    blockReqs
}
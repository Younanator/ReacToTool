const ip = require('ip');
var cmd=require('node-cmd');
let ipName = null

const blockReqs = (req,res,next) => {
     
    

    if(ipName === null){
        cmd.get(
            'ipconfig | findstr /i "ipv4"',
            function(err, data, stderr){
                ipName = data
            }
        );
        next()
    }
    else{
        next()
    }
    
   

}


module.exports = {
    blockReqs
}
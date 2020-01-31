

module.exports = (app,ps) => {

    const index = async () => {
        app.get("/api/GetUsers",  function(req, res) {
    
               
                 ps.addCommand(`& "${require('path').resolve(__dirname, '50Users.ps1')}"`);
                 
                 ps.invoke().then(output => {
                     
                     const users = output.split("\n")

                    res.status(200).send(users)
                 }).catch(error => {
                    res.status(422).send(error)
                 });
    
          });  
}


const unlockUser = async () => {
    app.get("/api/UnlockAD",  function(req, res) {

        const {user} = req.query;
           
              ps.addCommand(`

$user = "Unlocked user ${user}"
$err = "Account is not locked"

if(Unlock-ADAccount -Identity ${user}){
 $user
}
else{
 $err
}


              
              
              `);
             
             ps.invoke().then(output => {
                 
                
                res.status(200).send(output)
             }).catch(error => {
                console.log('err')
                res.status(422).send('Error')
             });      
      });  
}


  

    return Object.create({
        index,
        unlockUser
        // ...
    })
}


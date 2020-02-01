

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



const getAllUsers = async () => {
    app.get("/api/AllUsers",  function(req, res) {

        
           
              ps.addCommand(`
              $users = Get-ADUser -Filter * -SearchBase "OU=User Accounts,DC=CE,DC=CORP"
              $myobject = @()
              
              for($i=0; $i -lt $users.length; $i++){
              $str = ''
              $str += $users[$i].Name + ',' + $users[$i].SamAccountName
              
              $myobject += $str
              }
              
              $myobject
              
              
              `);
             
             ps.invoke().then(output => {
                 let users = []
                 const list = output.split('\n')
                 
                 list.map(e => {
                     const split = e.split(',')
                     users.push({
                         name:split[0],
                         samAcc:split[1]
                        })
                 })
                
                
                res.status(200).send(users)
             }).catch(error => {
                console.log('err')
                res.status(422).send('Error')
             });      
      });  
}

  

    return Object.create({
        index,
        unlockUser,
        getAllUsers
        // ...
    })
}


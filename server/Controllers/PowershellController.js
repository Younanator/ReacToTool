const { exec } = require('child_process');
const ip = require('ip');
const Shell = require('node-powershell');



module.exports = (app) => {


const unlockUser = async () => {
   
    app.get("/api/UnlockAD",  function(req, res) {
      const ps = new Shell({
         verbose:true,
           executionPolicy: 'Bypass',
           noProfile: true,
         });

        const {user} = req.query;
           
              ps.addCommand(`

              $user = Get-ADUser -property 'LockedOut' -identity ${user} 

              $succMsg = "Unlocked user ${user}"
              $errMsg = "Account is not locked"
              
              if($user.LockedOut -eq $true){
              Unlock-ADAccount -Identity ${user}
              $succMsg
              }
              else{
              $errMsg
              }
            
              
              `);
             
             ps.invoke().then(output => {
                 
                ps.dispose()
                res.status(200).send(output)
             }).catch(error => {
                ps.dispose()
                console.log('err')
                res.status(422).send(error.toString())
             });      
      });  
}


const openLink = async () => {
   app.get("/api/Link",  function(req, res) {
      
      const {app,link} = req.query;
      
      exec(`start "" ${app} ${link}`)
      
      res.status(200).send(`Opened ${link}`)

 });  
}




const getSecurityGroups = async () => {
   app.get("/api/FilePermissions",  function(req, res) {
     const ps = new Shell({
        verbose:true,
          executionPolicy: 'Bypass',
          noProfile: true,
        });

          const {path} = req.query;
          
          ps.addCommand(`
              
          $item = Get-Acl -Path  ("${path}") | ForEach-Object { $_.Access  }
          
          $item.IdentityReference.value


          `);
          
          ps.invoke().then(output => {
              
            const data = output.split('\n')
           
           ps.dispose()
           
         
           
           
           
           res.status(200).send(data)
        }).catch(error => {
           ps.dispose()
           console.log(error)
           res.status(422).send(error)
        }); 

          
        
     });  

}

    return Object.create({
        index,
        sendRemoteMessage,
        unlockUser,
        getAllUsers,
        RDPSccm,
        RemoteSccm,
        GetSccmUsers,
        openLink,
        getSecurityGroups,
        AddUserToFGroup

        // ...
    })
}


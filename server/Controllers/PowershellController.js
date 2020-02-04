const { exec } = require('child_process');




module.exports = (app,ps) => {

    const index = async () => {
        app.get("/api/GetUsers",  function(req, res) {
                 ps.addCommand(`
                 $users = Get-ADUser  -Filter * -SearchBase "OU=Class 1 Standard Users,OU=User Accounts,DC=CE,DC=CORP"
                 $edexusers = Get-ADUser  -Filter * -SearchBase "OU=Class 6 Edex Users,OU=User Accounts,DC=CE,DC=CORP"
                 $users+=$edexusers
                 
                 
                 for($i=0; $i -lt 50; $i++){
                 
                       $users[$i].UserPrincipalName
                 }`);
                 
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
                 
                
                res.status(200).send(output)
             }).catch(error => {
                console.log('err')
                res.status(422).send(error.toString())
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

  

const RDPSccm = async () => {
    app.get("/api/RDP",  function(req, res) {

        const {computer} = req.query;
           
              ps.addCommand(`
              mstsc /v:${computer}

              `);
             
             ps.invoke().then(output => {
                
                
                res.status(200).send(`Connected to ${computer}`)
             }).catch(error => {
                
                res.status(422).send('Error')
             });      
      });  
}

const RemoteSccm = async () => {
    app.get("/api/Remote",  function(req, res) {

        const {computer} = req.query;
           
              ps.addCommand(`
              ./CmRcViewer.exe ${computer}

              `);
             
             ps.invoke().then(output => {
                
                
                res.status(200).send(`Remoted to ${computer}`)
             }).catch(error => {
                
                res.status(422).send('Error')
             });      
      });  

}



const GetSccmUsers = async () => {
    app.get("/api/SccmUsers",  function(req, res) {

           const {user} = req.query;
           const namespace =`root\\sms\\site_STP`.replace(/\\/g,'/')

           
           
           ps.addCommand(`
           function Get-Users {
            param (
                [Parameter(Mandatory = $true)] 
                [string] $user
            )
            
            $Computers=(Get-WmiObject -namespace ${namespace} -query "SELECT SMS_R_System.Name FROM SMS_R_SYSTEM WHERE LastLogonUserName='$user'" -computer "syd1scm01.ce.corp" )
                    foreach ($computer in $computers) {
                                $computer.Name
                        }
            }
            
            $userComps = Get-users -user ${user}
            $userComps
           `);
           
           ps.invoke().then(output => {

                
            const computers = output.split('\n').filter(e => {
               return e !== ''
            })
            
            res.status(200).send(computers)
         }).catch(error => {
            console.log(error)
            res.status(422).send(error)
         }); 

           
         
      });  

}


    return Object.create({
        index,
        unlockUser,
        getAllUsers,
        RDPSccm,
        RemoteSccm,
        GetSccmUsers
        // ...
    })
}


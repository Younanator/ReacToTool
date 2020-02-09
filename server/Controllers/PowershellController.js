const { exec } = require('child_process');
const ip = require('ip');
const Shell = require('node-powershell');





module.exports = (app) => {

    const index = async () => {
      
        app.get("/api/GetUsers",  function(req, res) {
         const ps = new Shell({
            verbose:true,
              executionPolicy: 'Bypass',
              noProfile: true,
            });
                 ps.addCommand(`
                 $users = Get-ADUser  -Filter * -SearchBase "OU=Class 1 Standard Users,OU=User Accounts,DC=CE,DC=CORP"
                 $edexusers = Get-ADUser  -Filter * -SearchBase "OU=Class 6 Edex Users,OU=User Accounts,DC=CE,DC=CORP"
                 $users+=$edexusers
                 
                 
                 for($i=0; $i -lt 50; $i++){
                 
                       $users[$i].UserPrincipalName
                 }`);
                 
                 ps.invoke().then(output => {
                     ps.dispose()
                     const users = output.split("\n")

                    res.status(200).send(users)
                 }).catch(error => {
                    res.status(422).send(error)
                 });
    
          });  
}


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
                console.log('err')
                res.status(422).send(error.toString())
             });      
      });  
}



const getAllUsers = async () => {
   
    app.get("/api/AllUsers",  function(req, res) {
      const ps = new Shell({
         verbose:true,
           executionPolicy: 'Bypass',
           noProfile: true,
         });
        
           
              ps.addCommand(`
              $users = Get-ADUser -Filter * -SearchBase "OU=User Accounts,DC=CE,DC=CORP" -Properties Manager,LockedOut,Title,passwordlastset,passwordneverexpires
              $myobject = @()
              
              for($i=0; $i -lt $users.length; $i++){
              $str = ''
              $str += 
              $users[$i].Name + ',' + $users[$i].SamAccountName + ',' + $users[$i].Manager + ',' + $users[$i].Title + ',' + $users[$i].PasswordLastSet

             $myobject += $str
              }
              
              $myobject
              
              
              `);
             
             ps.invoke().then(output => {
                ps.dispose()
                 let users = []
                 const list = output.split('\n')
                 
                 list.map(e => {
                     const split = e.split(',')
                     users.push({
                         name:split[0],
                         samAcc:split[1],
                         manager:split[2]
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
      const ps = new Shell({
         verbose:true,
           executionPolicy: 'Bypass',
           noProfile: true,
         });

        const {computer} = req.query;
           
              ps.addCommand(`
              mstsc /v:${computer}

              `);
             
             ps.invoke().then(output => {
                ps.dispose()
                
                res.status(200).send(`Connected to ${computer}`)
             }).catch(error => {
                
                res.status(422).send('Error')
             });      
      });  
}

const RemoteSccm = async () => {
    app.get("/api/Remote",  function(req, res) {
      const ps = new Shell({
         verbose:true,
           executionPolicy: 'Bypass',
           noProfile: true,
         });
        const {computer} = req.query;
           
              ps.addCommand(`
              ./CmRcViewer.exe ${computer}

              `);
             
             ps.invoke().then(output => {
                ps.dispose()
                
                res.status(200).send(`Remoted to ${computer}`)
             }).catch(error => {
                
                res.status(422).send('Error')
             });      
      });  

}



const GetSccmUsers = async () => {
    app.get("/api/SccmUsers",  function(req, res) {
      const ps = new Shell({
         verbose:true,
           executionPolicy: 'Bypass',
           noProfile: true,
         });
           const {user} = req.query;
           const namespace =`root\\sms\\site_STP`.replace(/\\/g,'/')

           
           
           ps.addCommand(`
           

$userDetails = Get-ADUser -Identity ${user} -Properties Manager,LockedOut,Title,passwordlastset,passwordneverexpires,SAPuID1

function Get-Users {
            param (
                [Parameter(Mandatory = $true)] 
                [string] $user
            )


            
            $Computers=(Get-WmiObject -namespace ${namespace} -query "SELECT SMS_R_System.Name FROM SMS_R_SYSTEM WHERE LastLogonUserName='$user'" -computer "syd1scm01.ce.corp" )
                    foreach ($computer in $computers) {
                                
                     $compName = $computer.name
                     $Loggedon = Get-WmiObject -ComputerName $compName -ErrorAction SilentlyContinue -Authentication PacketIntegrity -Class Win32_Computersystem | Select-Object UserName
                     $loggedOnUser = $Loggedon.UserName

                     if($loggedOnUser){
                        $compName
                     }
           
                    
                    }
            }
            
            
            $manager = $userDetails.Manager
            $sapId = $userDetails.SAPuID1
            $title = $userDetails.Title
            $locked = $userDetails.lockedOut

           

            $userComps = Get-users -user ${user}
         
            
             $ourObject = [PSCustomObject]@{
            Manager = $manager
            SAP = $sapId
            Title = $title
            Computers = $userComps
            Locked = $locked
            } | ConvertTo-Json
            

          $ourObject
            

         
           `);
           
           ps.invoke().then(output => {
               
            
            ps.dispose()
            
            
            
            
            
            res.status(200).send(output)
         }).catch(error => {
            console.log(error)
            res.status(422).send(error)
         }); 

           
         
      });  

}

const openLink = async () => {
   app.get("/api/Link",  function(req, res) {
      
      const {app,link} = req.query;

      console.log(req.hostname)
      
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
              
          $item = Get-Acl -Path  ${path} | ForEach-Object { $_.Access  }
          
          $item.IdentityReference.value


          `);
          
          ps.invoke().then(output => {
              
            const data = output.split('\n')
           
           ps.dispose()
           
         
           
           
           
           res.status(200).send(data)
        }).catch(error => {
           console.log(error)
           res.status(422).send(error)
        }); 

          
        
     });  

}


const AddUserToFGroup = async () => {
   app.get("/api/AddUserToFGroup",  function(req, res) {
     const ps = new Shell({
        verbose:true,
          executionPolicy: 'Bypass',
          noProfile: true,
        });
          const {user,group} = req.query;
          

          
          
          ps.addCommand(`
              
          $user = Add-ADGroupMember -Identity ${group} -Members ${user}
          $user

          `);
          
          ps.invoke().then(output => {
              
         const data = output.split(',')
           
         ps.dispose()
           
         
           
           
           
           res.status(200).send(data)
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
        GetSccmUsers,
        openLink,
        getSecurityGroups,
        AddUserToFGroup

        // ...
    })
}


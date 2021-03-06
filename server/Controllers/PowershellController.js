const ip = require('ip');
const Shell = require('node-powershell');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const PowerShell = require("powershell");


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

const sendRemoteMessage = () => {
  

   app.post("/api/remoteMessage",  function(req, res) {
      
      
     const ps = new Shell({
        verbose:true,
          executionPolicy: 'Bypass',
          noProfile: true,
        });
        const location =`c:\\windows\\system32\\msg.exe`.replace(/\\/g,'/')
          const {message,computer} = req.query;
         
          ps.addCommand(`
              
          $server =  '${computer}';
$message = '${message}'; 
Invoke-WmiMethod -Class win32_process -ComputerName $server -Name create -ArgumentList  "${location} * $message" 


          `);
          
          ps.invoke().then(output => {
            ps.dispose()
            const data = output.split('\n')
           
           
           
         
           
           
           
           res.status(200).send(data)
        }).catch(error => {
           ps.dispose()
           console.log(error)
           res.status(422).send(error)
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
           
              ps.addCommand(`./CmRcViewer.exe ${computer}`);
             
             ps.invoke().then(output => {
                ps.dispose()
                
                res.status(200).send(`Remoted to ${computer}`)
             }).catch(error => {
               ps.dispose()
                res.status(422).send(error)
             });      
      });  

}


/** 
 Line 253 might require some changes for your SQL site - Although this should work
*/

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


            
            $Computers=(Get-WmiObject -namespace ${namespace} -query "SELECT SMS_R_System.Name FROM SMS_R_SYSTEM WHERE LastLogonUserName='$user'" -computer "{ENTER SCCM HOST SITE}" )
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
            ps.dispose()
            console.log(error)
            res.status(422).send(error)
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
            ps.dispose()
            const data = output.split('\n')
           
           
           
         
           
           
           
           res.status(200).send(data)
        }).catch(error => {
           ps.dispose()
           console.log(error)
           res.status(422).send(error)
        }); 

          
        
     });  

     

}





    return Object.create({
       
        
        unlockUser,
        openLink,
        getSecurityGroups,
       

        // ...
    })
}


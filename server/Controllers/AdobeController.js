const Shell = require('node-powershell');

module.exports = (app) => {

    

    /**
     You will need to replace line 34 and 35 with your own search through Active Directory

     **/
    const index = async () => {
        app.get("/api/Adobe",  function(req, res) {
            const ps = new Shell({
                verbose:true,
                  executionPolicy: 'Bypass',
                  noProfile: true,
                });
            const {user} = req.query
           
            const docPath =`C:\\Users\\${user}\\Documents\\users.csv`.replace(/\\/g,'/')

            console.log(docPath)
                 ps.addCommand(`
                 
                 <#
Author: Created by Chris Younan
Date : 30/10/2019
#>

<# 
Read the Readme in zip file attached
#>
$mydocuments = [environment]::getfolderpath("mydocuments")
$users = Get-ADUser   -Filter * -SearchBase "OU=Class 1 Standard Users,OU=User Accounts,DC=CE,DC=CORP"
$edexusers = Get-ADUser   -Filter * -SearchBase "OU=Class 6 Classic Users,OU=User Accounts,DC=CE,DC=CORP"
$users+=$edexusers
$P = Import-Csv -Path ${docPath}
$arrayFinal = @()

for($i=0; $i -lt $users.length; $i++){

      for($k = 0; $k -lt $P.length; $k++){

            if($P[$k].email  -eq $users[$i].UserPrincipalName){
           $arrayFinal+=$P[$k]
      
      }
   }
   
}


$missing =  $P | Where {$arrayFinal -NotContains $_}


foreach($user in $missing){
$user.email
}

                 `);
                 
                 ps.invoke().then(output => {
                     ps.dispose()
                     const users = output.split("\n")
                      
                    res.status(200).send(users)
                 }).catch(error => {
                     console.log(error)
                    res.status(422).send('Error , check server')
                 });

            
          });  
}


  

    return Object.create({
        index,
        // ...
    })
}




module.exports = (app,ps) => {

    

    const index = async () => {
        app.get("/api/Adobe",  function(req, res) {
    
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
$edexusers = Get-ADUser   -Filter * -SearchBase "OU=Class 6 Edex Users,OU=User Accounts,DC=CE,DC=CORP"
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


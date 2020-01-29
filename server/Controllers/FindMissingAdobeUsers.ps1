<#
Author: Created by Chris Younan
Date : 30/10/2019
#>

<# 
Read the Readme in zip file attached
#>
$mydocuments = [environment]::getfolderpath("mydocuments")
$users = Get-ADUser  -Properties “LastLogonDate” -Filter * -SearchBase "OU=Class 1 Standard Users,OU=User Accounts,DC=CE,DC=CORP"
$edexusers = Get-ADUser  -Properties “LastLogonDate” -Filter * -SearchBase "OU=Class 6 Edex Users,OU=User Accounts,DC=CE,DC=CORP"
$users+=$edexusers
$P = Import-Csv -Path $mydocuments\users.csv
$arrayFinal = @()

for($i=0; $i -lt $users.length; $i++){

      for($k = 0; $k -lt $P.length; $k++){

      if($users[$i].UserPrincipalName -eq $P[$k].email){

           $arrayFinal+=$P[$k]
      
      }
   }
   
}


$missing = $P | Where {$arrayFinal -NotContains $_}


foreach($user in $missing){
$user.email
}


<#
Created By : Chris Younan
Date : 4/11/2019
#>

$users = Get-ADUser -Properties “LastLogonDate” -Filter * -SearchBase "OU=Class 1 Standard Users,OU=User Accounts,DC=CE,DC=CORP"
$edexusers = Get-ADUser -Properties “LastLogonDate” -Filter * -SearchBase "OU=Class 6 Edex Users,OU=User Accounts,DC=CE,DC=CORP"
$users+=$edexusers


for($i=0; $i -lt 50; $i++){

      $users[$i].UserPrincipalName
}





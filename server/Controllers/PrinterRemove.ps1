
$users = Get-ADUser  -Properties “extensionAttribute5” -Filter * -SearchBase "OU=Disabled Accounts,DC=CE,DC=CORP"
$usersRemoved = @()


Add-Type -AssemblyName PresentationCore,PresentationFramework
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')	


$title = 'Remove Printer Access'
$msg   = 'Names of Users Separate by comma:'
$text = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

$usersRemove = $text.split(",")
$newArray = @($usersRemove)


for($i=0; $i -lt $users.length; $i++){

 for($k = 0; $k -lt $newArray.length; $k++){

    if($users[$i].name -eq $newArray[$k]){

           
           
           $replaceName = $users[$i].name

           $filterStr = "Name -eq "
           $filterStr += "'$replaceName'"
           

           Get-ADUser -Properties “extensionAttribute5” -Filter $filterStr -SearchBase "OU=Disabled Accounts,DC=CE,DC=CORP" |Set-ADUser -Clear "extensionAttribute5"
        
        $usersRemoved += $users[$i].name;
  
   }
  }     
 }

$missing = $newArray | Where {$users.name -NotContains $_}


 [System.Windows.MessageBox]::Show($usersRemoved)
 $missing


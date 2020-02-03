param (
    [Parameter(Mandatory = $true)] 
    [string] $user
)

$Computers=(Get-WmiObject -namespace 'root\sms\site_STP' -query "
SELECT SMS_R_System.Name 
FROM SMS_R_SYSTEM 
WHERE LastLogonUserName='$user'" -computer "syd1scm01.ce.corp" )
                foreach ($computer in $computers) {
                    $computer.Name
            }

            


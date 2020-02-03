

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
           
              ps.addCommand(`
              
              function Get-SCCMUserComputer
              {
              <#
                  .SYNOPSIS
                      Gets the NetbiosName for a User (name or SamAccountName)
              
                  .DESCRIPTION
                      Retrieves the NetbiosName property on the SMS_R_System class based on the LastlogonUsername as filter.
                      Can use the SamAccountNames or a Name to get the machine name, uses ADSI To find the Users when Name is specified.
              
                  
                  .EXAMPLE
                      Get-SCCMUserComputer -identity dexter,Administrator
              
                      SamAccountName                          ComputerName                           
                      --------------                          ------------                           
                      dexter                                  Dexter-PC                         
                      Administrator                           DexterDC
                      
                      Multiple SamAccountNames can be passed as an input.
                      By default assumes the localmachine has SMS Provider installed.
              
                  .EXAMPLE
                      Get-SCCMUserComputer -Name "Dexter POSH" -SCCMServer DexSCCM
              
                      Name                       SamAccountName             ComputerName             
                      ----                       --------------             ------------             
                      {Dexter POSH}              {dexter}                   Dexter-PC
                      
                      When using the Name parameter we can specify the name like below and the space is replaced with a wild card.
                      ADSI filter used to search for below is 'Dexter*POSH'. Out-Gridview will prompt you to select a User you want
                      the machine name for. Specify the remote SCCM Server with SMS namespace installed.                 
              
                  .EXAMPLE
                      This one works the same way but the filter used is "*Dexter*" and this makes the search very slow.
                      PS C:\> Get-SCCMUserComputer -Name "Dexter" -SCCMServer DexSCCM
              
                      Name                       SamAccountName             ComputerName             
                      ----                       --------------             ------------             
                      {Dexter POSH}              {dexter}                   Dexter-PC
                                
                  .EXAMPLE
                              
                       'dexter','Administrator' | Get-SCCMUserComputer -SCCMServer DexSCCM
              
                      SamAccountName                          ComputerName                           
                      --------------                          ------------                           
                      dexter                                  Dexter-PC                         
                      Administrator                           DexterDC
              
                      One can pipe the SamAccountNames to the Function as well 
                  .INPUTS
                      System.String[]
              
                  .OUTPUTS
                      PSObject[]
              
                  .NOTES
                      Written by - DexterPOSH
                      Blog Url - http://dexterposh.blogspot.com
              #>
              #requires -version 3.0
              [CmdletBinding(DefaultParameterSetName="Identity")]
              [OutputType([PSObject])]
                  Param
                  (
                      # Specify the SamAccountName for the User
                      [Parameter(Mandatory=$true,
                                 ValueFromPipeline,
                                 ValueFromPipelineByPropertyName,
                                 ParameterSetName="Identity")]
                      [string[]]$identity,
              
                      # Specify the Name ...ADSI will be used to find the Users matching the criteria
                     [Parameter(Mandatory=$true,
                                 ValueFromPipelineByPropertyName=$true,
                                 ParameterSetName="Name")]
                      [string]$Name,
              
                      #specify the SCCMServer having SMS Namespace provider installed for the site. Default is the local machine.
                      [Parameter(Mandatory=$false)]
                      [Alias("SMSProvider")]
                      [String]$SCCMServer="DexSCCM"
              
                  )
              
                  Begin
                  {
                      #region open a CIM session
                      $CIMSessionParams = @{
                                  ComputerName = $SCCMServer
                                  ErrorAction = 'Stop'
                                  
                              }
                      try
                      {
                          If ((Test-WSMan -ComputerName $SCCMServer -ErrorAction SilentlyContinue).ProductVersion -match 'Stack: 3.0')
                          {
                              Write-Verbose -Message "[BEGIN] WSMAN is responsive"
                              $CimSession = New-CimSession @CIMSessionParams
                              $CimProtocol = $CimSession.protocol
                              Write-Verbose -Message "[BEGIN] [$CimProtocol] CIM SESSION - Opened"
                          } 
              
                          else 
                          {
                              Write-Verbose -Message "[PROCESS] Attempting to connect with protocol: DCOM"
                              $CIMSessionParams.SessionOption = New-CimSessionOption -Protocol Dcom
                              $CimSession = New-CimSession @CIMSessionParams
                              $CimProtocol = $CimSession.protocol
              
                              Write-Verbose -Message "[BEGIN] [$CimProtocol] CIM SESSION - Opened"
                          }
                     
              
                      #endregion open a CIM session
              
                         
                          $sccmProvider = Get-CimInstance -query "select * from SMS_ProviderLocation where ProviderForLocalSite = true" -Namespace "root\sms" -CimSession $CimSession -ErrorAction Stop
                          # Split up the namespace path
                          $Splits = $sccmProvider.NamespacePath -split "\\", 4
                          Write-Verbose "[BEGIN] Provider is located on $($sccmProvider.Machine) in namespace $($splits[3])"
               
                          # Create a new hash to be passed on later
                          $hash= @{"CimSession"=$CimSession;"NameSpace"=$Splits[3];"ErrorAction"="Stop"}
                                                
                          
                      }
                      catch
                      {
                          Write-Warning "[BEGIN] Something went wrong"
                          throw $Error[0].Exception
                      }
                  }
                  Process
                  {
                      Switch -exact ($PSCmdlet.ParameterSetName)
                      {
                          "Identity"
                          {
                              foreach ($id in $identity)
                              {
                                  $query = "Select NetbiosName from {0} where LastlogonUserName='{1}'" -f "SMS_R_System",$id
                                  Get-CimInstance -Query $query @hash -PipelineVariable UserComputer | 
                                      foreach -Process {
                                                          [pscustomobject]@{
                                                                                                                                          
                                                                              SamAccountName = $id
                                                                              ComputerName = $userComputer.netbiosname
                                                                              }}
                                                          
                              }
                          }
                          
                          "Name"
                          {
                              $adsisearcher = New-Object -TypeName System.DirectoryServices.DirectorySearcher
                              if ($Name -notmatch '\s+')
                              {
                                  $Name = "*$Name*" #Add wildcard * (asterix) if a single name is specified..will be a bit slow after this (ADSI search)
                              }
                              $adsisearcher.Filter ='(&(objectCategory=person)(objectClass=user)(name={0}))' -f $($($name -replace '\s+',' ')  -replace ' ','*')
              
                              $users = $adsisearcher.FindAll() 
                              if ($users.count -ne 0)
                              {
                                  if ($users.Count -ne 1)
                                  {
                                   $users = $users | select -ExpandProperty properties | 
                                              foreach { [pscustomobject]@{Name=$_.name;SamAccountName=$_.samaccountname;Email=$_.mail;Title=$_.title;Location=$_.l} } |
                                                  Out-GridView -OutputMode Multiple -Title "Select the User"
                                  }
                                  else
                                  {
                                      #only one User found with the Name then have to manipulate the $Users a bit 
                                      $users = $users | select -ExpandProperty properties | 
                                              foreach { [pscustomobject]@{Name=$_.name;SamAccountName=$_.samaccountname;Email=$_.mail;Title=$_.title;Location=$_.l} } 
                                  }
                                  foreach ($user in $users)
                                  {
                                      $query = "Select NetbiosName from {0} where LastlogonUserName='{1}'" -f "SMS_R_System",$($user.samaccountname)
                                      Get-CimInstance -Query $query @hash -PipelineVariable UserComputer | 
                                          foreach -Process {
                                                              [pscustomobject]@{
                                                                                  Name=$user.name
                                                                                  SamAccountName = $user.samaccountname
                                                                                  ComputerName = $userComputer.netbiosname
                                                                                  }}
                                  }                    
                              }
                              else
                              {
                                  Write-Warning -Message "No Users could be found"
                              }
                          }
                      }
                  }
                  End
                  {
                      Write-Verbose -Message "[END] Ending the Function"
                  }
              }
              
              $computers = Get-SCCMUserComputer -identity ${user} -SCCMServer Syd1scm01.ce.corp
              
              $computers.ComputerName
            
              `);
             
             ps.invoke().then(output => {
                const computers = output.split('\n')
                
                res.status(200).send(computers)
             }).catch(error => {
                console.log('Error')
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


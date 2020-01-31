

module.exports = (app,ps) => {

    const index = async () => {
        app.get("/api/GetUsers",  function(req, res) {
    
               
                 ps.addCommand(`& "${require('path').resolve(__dirname, '50Users.ps1')}"`);
                 
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
              param([switch]$Elevated)

function Test-Admin {
  $currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
  $currentUser.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}

if ((Test-Admin) -eq $false)  {
    if ($elevated) 
    {
        # tried to elevate, did not work, aborting
    } 
    else {
        Start-Process powershell.exe -Verb RunAs -ArgumentList ('-noprofile -noexit -file "{0}" -elevated' -f ($myinvocation.MyCommand.Definition))
}

exit
}

'running with full privileges'
              Unlock-ADAccount -Identity ${user}

              
              
              `);
             
             ps.invoke().then(output => {
                 
                ps.dispose()
                res.status(200).send(`Unlocked User ${user}`)
             }).catch(error => {
                 ps.dispose()
                res.status(422).send('Cannot unlock user')
             });      
      });  
}


  

    return Object.create({
        index,
        unlockUser
        // ...
    })
}


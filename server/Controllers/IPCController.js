const ip = require('ip');
const Shell = require('node-powershell');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const PowerShell = require("powershell");


module.exports = (ipcMain) => {

 const index = () => {
    ipcMain.on('compInfo', (event, arg) => {

        const ps = new Shell({
            verbose:true,
              executionPolicy: 'Bypass',
              noProfile: true,
            });
    
              
              ps.addCommand(`
                  
              Get-ComputerInfo
    
    
              `);
              
              ps.invoke().then(output => {
                ps.dispose()
                const data = output.split('\n')
                event.reply('compInfo-reply', data)
              
            }).catch(error => {
               ps.dispose()
               console.log(error)
               event.reply('compInfo-reply', [])
            }); 

        
    })
      
 }


    return Object.create({
       
        
        index
       

        // ...
    })
}


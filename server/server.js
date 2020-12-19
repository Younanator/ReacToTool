
const express = require('express');
const port = process.env.PORT || 5000;
const path = require("path");
const cors = require('cors')
const app = express();
const blockReqs = require('./middleware')

module.exports = (ipcMain) => {
  const start = () => {
    app.set('trust proxy', true)
    app.use(cors({origin: '*',credentials:true,allowedHeaders:['Origin']}));
    app.use(blockReqs.blockReqs)
    const appID = 'ReactToTool'
    
    const PowershellController = require('./Controllers/PowershellController')(app)
    const IPCController = require('./Controllers/IPCController')(ipcMain)
    //
    PowershellController.unlockUser();
    PowershellController.openLink();
    PowershellController.getSecurityGroups();
    PowershellController.compInfo();
    // IPC Controller
    IPCController.index()
    
    
    
    
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../build", "index.html"));
    });
      
    app.listen(port, () => console.log('Running'));

  }
  
  
  
      return Object.create({
         
        start
          // ...
      })
  }

const express = require('express');
const port = process.env.PORT || 5000;
const path = require("path");
const Shell = require('node-powershell');
const cors = require('cors')
const app = express();
const blockReqs = require('./middleware')
const notifier = require('node-notifier');
let listening = false
app.set('trust proxy', true)
app.use(cors({origin: '*',credentials:true,allowedHeaders:['Origin']}));
//app.use(blockReqs.blockReqs)
const appID = 'ReactToTool'


const PowershellController = require('./Controllers/PowershellController')(app)


PowershellController.unlockUser();
PowershellController.openLink();
PowershellController.getSecurityGroups();
PowershellController.compInfo();

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
  
app.listen(port, () => console.log('Running'));

module.exports = app
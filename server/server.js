
const express = require('express');
const port = process.env.PORT || 5000;
const path = require("path");
const Shell = require('node-powershell');
const cors = require('cors')
const app = express();
const blockReqs = require('./middleware')
let listening = false

app.set('trust proxy', true)
app.use(cors({origin: 'http://localhost:3000',credentials:true,allowedHeaders:['Origin']}));
app.use(blockReqs.blockReqs)

const ps = new Shell({
  verbose:true,
    executionPolicy: 'Bypass',
    noProfile: true,
  });


const AdobeController = require('./Controllers/AdobeController')(app)
const PrinterController = require('./Controllers/PrinterController')(app,ps)
const PowershellController = require('./Controllers/PowershellController')(app)

AdobeController.index();
//
PrinterController.index();
//
PowershellController.index();
PowershellController.unlockUser();
PowershellController.getAllUsers();
PowershellController.RDPSccm();
PowershellController.RemoteSccm();
PowershellController.GetSccmUsers();
PowershellController.openLink();
PowershellController.getSecurityGroups();
PowershellController.AddUserToFGroup();
PowershellController.sendRemoteMessage();

app.get("/api/Listening",  function(req, res) {
        
  res.status(200).send(` Port active on ${listening}`)
})

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
  
app.listen(port, () => {listening = true});

module.exports = app
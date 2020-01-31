
const express = require('express');
const port = process.env.PORT || 5000;
const path = require("path");
const Shell = require('node-powershell');


const cors = require('cors')

const app = express();
app.use(cors({origin: 'http://localhost:3000',credentials:true,allowedHeaders:['Origin']}));


const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true,
  });


const AdobeController = require('./Controllers/AdobeController')(app,ps)
const PrinterController = require('./Controllers/PrinterController')(app,ps)
const PowershellController = require('./Controllers/PowershellController')(app,ps)

AdobeController.index();
PrinterController.index();
PowershellController.index();
PowershellController.unlockUser();

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
  
app.listen(port, () => console.log(`Listening on port ${port}`));

This project was created using Electron, React, Powershell and NodeJS.
## Features  
ElectronIPC - Communicate from Electron to React
Express HTTP API with blocking middleware for non local IPs - Can be changed for production usage
## Preview
![Home Expand](https://i.ibb.co/MB59CDT/Capture.png)

## SETUP

1. Install nodeJS
2. Install Yarn global
3. Install React 
4. Clone repository
6. Install in the folder repository using "yarn install" via cmd/terminal
7. Run yarn prepack
8. Run program using  - yarn edev in folder directory
9. See General usage for how to configure it for your own use

## General Usage
   1. To make changes to the queries/controllers - go to the server/controllers folder. You may use that as a reference for future scripts and or functions in NodeJS. 
    See youtube tutorials or program the front-end buttons, text, list ,etc yourself. Traversy Media is one place where you can learn to use React.
   2. Make sure to run the application as an Admin, make sure that your AD rights,SCCM,etc are configured properly as the App uses your account privileges and won't work without it.
   3. Change script commands in package.json folder in scripts section according to your liking
   4. If you make changes to the server file, you will need to re-render the script with yarn edev again
   
## Production Usage
1. You will need to move the server folder to the public folder - Copy paste it
2. In electron.js in the public folder, add the following (remove the .. and leave one dot)
```
const reqServer = require('./server/server.js')
```
3. Execute - yarn prepack
4. Execute - yarn epack 
5. Go to directory where it has placed the installer (dist folder) and run the installer or copy it wherever you need
6. You will need to place the content of the prodresources folder and place the 0000049 folder in the same directory to utilize RDP, SCCM remote connect, etc. 
7. Done

You may use this tool, make edits and reconfigure the whole thing if you like.
I'd appreciate if you acknowledge me however  =). 
This project was created using Electron, React, Powershell and NodeJS.
## Preview
![Home Expand](https://i.ibb.co/MB59CDT/Capture.png)

## SETUP

1. Install nodeJS
2. Install Yarn global
3. Install React 
4. Clone repository
6. Install in the folder repository using "yarn install" via cmd/terminal
7. Run program using  - yarn edev (Runs nodejs server concurrently with react script)
8. See General usage for how to configure it for your own use

## General Usage
   1. To make changes to the queries/controllers - go to the server/controllers folder. You may use that as a reference for future scripts and or functions in NodeJS. 
    See youtube tutorials or program the front-end buttons, text, list ,etc yourself. Traversy Media is one place where you can learn to use React.
   2. Make sure to run the application as an Admin, make sure that your AD rights,SCCM,etc are configured properly as the App uses your account privileges.
   
## Production Usage
1. You will need to move the server folder to the public folder - Copy paste it
2. In electron.js in the public folder, add the following
```
const reqServer = require('./server/server.js)
```
3. Execute - yarn prepack
4. Execute - yarn epack 
5. Go to directory where it has placed the installer and run the installer or copy it wherever you need
6. You will need to place the content of the prodresources folder and place the 0000049 folder in the same directory to utilize RDP, etc. 
7. Done
You may use this tool, make edits and reconfigure the whole thing if you like.
I'd appreciate if you acknowledge me however  =). 
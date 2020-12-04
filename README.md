This project was created using Electron, React, Powershell and NodeJS.

## SETUP

1. Install nodeJS
2. Install Yarn global
3. Install React 
4. Clone repository
6. Install in the folder repository using "yarn install" via cmd/terminal
7. Run program using  - yarn edev
8. See General usage for how to configure it for your own use

## General Usage
   1. To make changes to the queries/controllers - go to the server/controllers folder. You may use that as a reference for future scripts and or functions in NodeJS. 
   2. Make sure to run the application as an Admin, make sure that your AD rights,SCCM,etc are configured properly as the App uses your account privileges.
   
## Production Usage
1. You will need to move the server folder to the public folder - Copy paste it
2. Execute - yarn prepack
3. Execute - yarn epack 
4. Go to directory where it has placed the installer and run the installer or copy it wherever you need
5. Done

You may use this tool, make edits and reconfigure the whole thing if you like.
I'd appreciate if you acknowledge me however  =). 
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "node server/server.js",0, True
Set WshShell = Nothing
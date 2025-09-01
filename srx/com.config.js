const { app, ipcRenderer, ipcMain, BrowserWindow, session, powerMonitor, screen} = require('electron');
const path = require('path');
const express = require('express');
const port = 5052;
const host = 'localhost';
const prox = express();

prox.use(express.static(path.join(__dirname, '..', 'public')));
prox.use('/assx', express.static(path.join(__dirname, '..', 'assx')));

prox.listen(port, () => { console.log(`com.dexly.server policy is mounted following http protocol on local domain: ${host} using the :${port} port.`) })
let widget;

async function Mount() {
    
    widget = new BrowserWindow({

        width: 350,
        height: 150,
        focusable: false,
        frame: false,
        show: true,
        resizable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        show: false,
        webPreferences:{

            preload: path.join(__dirname, 'com.preloader.js'),

        }

    })


    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    widget.setBounds({

        x: Math.round((width - 400) / 2 ),
        y: height - 150 - 30,
        width: 350,
        height:150,

    })
    
    widget.loadURL(`http://${host}:${port}`)

}

app.whenReady().then(Mount)




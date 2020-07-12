const device = '/dev/fb1';
const framebuffer = require('framebuffer');
const fs = require("fs");
const fb = fs.openSync(device, "w"); // where /dev/fb1 is the path to your fb device
const fbInfo = new framebuffer(device);

console.log('Screen Size: ' + fbInfo.xres + ' by ' + fbInfo.yres);

const cam = require('./linuxcam.js');
cam.start("/dev/video0", fbInfo.xres, fbInfo.yres);

// node-canvas isa good way to edit the image
const imageData = new Uint16Array(fbInfo.xres * fbInfo.yres);

let i=0;
const intervalId = setInterval(function () {
    cam.frame(imageData);
    fs.writeSync(fb, imageData, 0, imageData.byteLength, 0);
}, 1000/10);

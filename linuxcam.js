var cam = require('linuxcam/build/Release/v4l2.node');

module.exports.start = function(dev, width, height) {
  cam.start(dev, width, height);
};

module.exports.frame = function(imageData) {
  var iframe = cam.frame();
  var frame = {
    data: to_buffer(iframe[0], imageData),
    width: iframe[1],
    height: iframe[2],
  }
  return frame;
};

/*
* @param {ArrayBuffer} ab
*/
function to_buffer(ab, imageData) {
  const view = new Uint8ClampedArray(ab);
  for (let i = 0; i < view.length; i+=3) {
    const imageDataIndex = i/3;
    const red = view[i];
    const green = view[i+1];
    const blue = view[i+2];
    imageData[imageDataIndex] = (red >> 3 << 11) + (green >> 2 << 5) + (blue >> 3);
  }
  return imageData;
}
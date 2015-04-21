cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/com.megster.cordova.bluetoothserial/www/bluetoothSerial.js",
        "id": "com.megster.cordova.bluetoothserial.bluetoothSerial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "file": "plugins/co.mwater.opencvactivityplugin/www/OpenCVActivity.js",
        "id": "co.mwater.opencvactivityplugin.OpenCVActivity",
        "clobbers": [
            "OpenCVActivity"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.device": "0.3.0",
    "org.apache.cordova.console": "0.2.13",
    "com.megster.cordova.bluetoothserial": "0.4.2",
    "co.mwater.opencvactivityplugin": "3.0.0"
}
// BOTTOM OF METADATA
});
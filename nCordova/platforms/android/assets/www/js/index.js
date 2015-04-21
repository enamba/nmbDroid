// (c) 2013-2015 Don Coleman
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global mainPage, deviceList, refreshButton, statusDiv */
/* global detailPage, resultDiv, messageInput, sendButton, disconnectButton */
/* global cordova, bluetoothSerial  */
/* jshint browser: true , devel: true*/
'use strict';

function onLoad(){
	app.onDeviceReady();
}

var app = {
    initialize: function() {
        this.bindEvents();
        this.showMainPage();
    },
    bindEvents: function() {

        var TOUCH_START = 'touchstart';
        var TOUCH_END = 'touchend';

        refreshButton.addEventListener(TOUCH_START, this.refreshDeviceList, false);
        
        sendButtonTras.addEventListener(TOUCH_START, this.sendDataTras, false);
        sendButtonTras.addEventListener(TOUCH_END, this.sendDataParar, false);
        
        sendButtonFrente.addEventListener(TOUCH_START, this.sendDataFrente, false);
        sendButtonFrente.addEventListener(TOUCH_END, this.sendDataParar, false);
        
        sendButtonDireita.addEventListener(TOUCH_START, this.sendDataDireita, false);
        sendButtonDireita.addEventListener(TOUCH_END, this.sendDataParar, false);
        
        sendButtonEsquerda.addEventListener(TOUCH_START, this.sendDataEsquerda, false);
        sendButtonEsquerda.addEventListener(TOUCH_END, this.sendDataParar, false);
        
        sendButtonParar.addEventListener(TOUCH_START, this.sendDataParar, false);
        disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
        deviceList.addEventListener(TOUCH_START, this.connect, false);
    },
    onDeviceReady: function() {
        app.refreshDeviceList();
    },
    refreshDeviceList: function() {
        bluetoothSerial.list(app.onDeviceList, app.onError);
    },
    onDeviceList: function(devices) {
        var option;

        // remove existing devices
        deviceList.innerHTML = "";
        app.setStatus("");

        devices.forEach(function(device) {

            var listItem = document.createElement('li'),
                html = '<b>' + device.name + '</b><br/>' + device.id;

            listItem.innerHTML = html;

            if (cordova.platformId === 'windowsphone') {
              // This is a temporary hack until I get the list tap working
              var button = document.createElement('button');
              button.innerHTML = "Connect";
              button.addEventListener('click', app.connect, false);
              button.dataset = {};
              button.dataset.deviceId = device.id;
              listItem.appendChild(button);
            } else {
              listItem.dataset.deviceId = device.id;
            }
            deviceList.appendChild(listItem);
        });

        if (devices.length === 0) {

            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            deviceList.appendChild(option);

            if (cordova.platformId === "ios") { // BLE
                app.setStatus("No Bluetooth Peripherals Discovered.");
            } else { // Android or Windows Phone
                app.setStatus("Please Pair a Bluetooth Device.");
            }

        } else {
            app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        }

    },
    connect: function(e) {
        var onConnect = function() {
                // subscribe for incoming data
                bluetoothSerial.subscribe('\n', app.onData, app.onError);

                resultDiv.innerHTML = "";
                app.setStatus("Connected");
                app.showDetailPage();
            };

        var deviceId = e.target.dataset.deviceId;
        if (!deviceId) { // try the parent
            deviceId = e.target.parentNode.dataset.deviceId;
        }

        bluetoothSerial.connect(deviceId, onConnect, app.onError);
    },
    onData: function(data) { // data received from Arduino
        console.log(data);
        resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
        resultDiv.scrollTop = resultDiv.scrollHeight;
    },
    sendDataTras: function(event) { // send data to Arduino
        var success = function() {console.log("success");};
        var failure = function() {alert("Failed writing data to Bluetooth peripheral");};
        var data = messageInputTras.value;
        bluetoothSerial.write(data, success, failure);
    },
    sendDataFrente: function(event) { // send data to Arduino
        var success = function() {console.log("success");};
        var failure = function() {alert("Failed writing data to Bluetooth peripheral");};
        var data = messageInputFrente.value;
        bluetoothSerial.write(data, success, failure);
    },
    sendDataDireita: function(event) { // send data to Arduino
        var success = function() {console.log("success");};
        var failure = function() {alert("Failed writing data to Bluetooth peripheral");};
        var data = messageInputDireita.value;
        bluetoothSerial.write(data, success, failure);
    },
    sendDataEsquerda: function(event) { // send data to Arduino
        var success = function() {console.log("success");};
        var failure = function() {alert("Failed writing data to Bluetooth peripheral");};
        var data = messageInputEsquerda.value;
        bluetoothSerial.write(data, success, failure);
    },
    sendDataParar: function(event) { // send data to Arduino
        var success = function() {console.log("success");};
        var failure = function() {alert("Failed writing data to Bluetooth peripheral");};
        var data = messageInputParar.value;
        bluetoothSerial.write(data, success, failure);
    },
    disconnect: function(event) {
        bluetoothSerial.disconnect(app.showMainPage, app.onError);
    },
    showMainPage: function() {
        mainPage.style.display = "";
        detailPage.style.display = "none";
    },
    showDetailPage: function() {
        mainPage.style.display = "none";
        detailPage.style.display = "";
    },
    setStatus: function(message) {
        console.log(message);

        window.clearTimeout(app.statusTimeout);
        statusDiv.innerHTML = message;
        statusDiv.className = 'fadein';

        // automatically clear the status with a timer
        app.statusTimeout = setTimeout(function () {
            statusDiv.className = 'fadeout';
        }, 5000);
    },
    onError: function(reason) {
        alert("ERROR: " + reason); // real apps should use notification.alert
    }
};

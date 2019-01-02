var selectedMachine;
var selectedDataset;
var selectedDatasetPerformance;
var chartColor = localStorage.lsChartColor;
var areaColor  = localStorage.lsAreaColor;
var tempChart;
var performChart;
var firstTempChart;
var firstPerformanceChart;

function init() {
    changeDataset(localStorage.lsSelectedMachine);
    document.getElementById("alertLevel").innerHTML = localStorage.lsAlarmLevel + "°C";
    document.getElementById("colorPicker").value = localStorage.lsChartColor;
    document.getElementById("cbDisplayTempChart").checked = true;
    document.getElementById("cbDisplayPerformanceChart").checked = true;

};

function manageChartAppearance(entity, chartID){
    var value = entity.checked;
    
    if(value){
        document.getElementById(chartID).style.display = "block";
    } else {
        document.getElementById(chartID).style.display = "none";
    };

    if(entity.id === "cbDisplayTempChart"){
        localStorage.setItem("lsDisplayTempChart", value);
        console.log(localStorage.lsDisplayTempChart);
    } else if (entity.id === "cbDisplayPerformanceChart"){
        localStorage.setItem("lsDisplayPerformanceChart", value);
        console.log(localStorage.lsDisplayPerformanceChart);
    };
};

function initCheckBox(){
    if(state){
        document.getElementById("cbDisplayTempChart").checked = "true";
    } else {
        document.getElementById("cbDisplayTempChart").checked = "false";
    };
};

function drawTempChart(){
    firstTempChart = document.getElementById('canvasTempChart');

    // Global Chart Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 15;
    Chart.defaults.global.defaultFontColor = '#777';

    Chart.scaleService.updateScaleDefaults('linear', {
        ticks: {
            min: 0,
            max: 160
        }
    });

    tempChart = new Chart(firstTempChart, {
    type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
        labels: temperatureChart.timeLine,
        datasets:[{
        label: ['Temperature'],
        data: selectedDataset,
        backgroundColor:areaColor,
        borderWidth:2,
        borderColor: chartColor,
        hoverBorderWidth:3,
        hoverBorderColor:'#123',
        fill: true,
        }]
    },
    options:{
        title:{
        display:true,
        text:'Temperature Monitoring',
        fontSize:18,
        },
        legend:{
        display:true,
        position:'right',
        labels:{
            fontColor:'#000'
        }
        },
        layout:{
        padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
        }
        },
        tooltips:{
        enabled:true
        }
    }
    });
};

function drawPerformanceChart(){
    firstPerformanceChart = document.getElementById('canvasPerformanceChart');
    
    // Global Chart Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 15;
    Chart.defaults.global.defaultFontColor = '#777';

    Chart.scaleService.updateScaleDefaults('linear', {
        ticks: {
            min: 0,
            max: 100
        }
    });

    performChart = new Chart(firstPerformanceChart, {
    type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
        labels: temperatureChart.timeLine,
        datasets:[{
        label: ['Power'],
        data: selectedDatasetPerformance,
        backgroundColor:'rgba(255,83,13,0.3)',
        borderWidth:2,
        borderColor: 'rgb(255,83,13)',
        hoverBorderWidth:3,
        hoverBorderColor:'#123',
        fill: true,
        }]
    },
    options:{
        title:{
        display:true,
        text:'Power Monitoring',
        fontSize:18,
        },
        legend:{
        display:true,
        position:'right',
        labels:{
            fontColor:'#000'
        }
        },
        layout:{
        padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
        }
        },
        tooltips:{
        enabled:false
        }
    }
    });
};

function initTimeLine() {
    var i;
    for (i = 0; i < 31; i++) { 
    var t = 30 - i;
    temperatureChart.timeLine[i] = "t-" + t;
    };
};

var temperatureChart = {
    "timeLine": [],
    "machine1": [],
    "machine2": [],
    "machine3": [],
    "machine4": [],
    "machine5": []
};

var performanceChart = {
    "timeLine": [],
    "machine1": [],
    "machine2": [],
    "machine3": [],
    "machine4": [],
    "machine5": []
};

var arrMainInformation = {
    "machine1":[],
    "machine2":[],
    "machine3":[],
    "machine4":[],
    "machine5":[]
};

var machineServer = {
    "allMachineData" : null,
    "getData": function (dataURL) {

        var internalSelfReference = this;
		var serverCommunication = new XMLHttpRequest();

        serverCommunication.responseType = 'json';
        serverCommunication.addEventListener("load", function () {
           var data = this.response;
           internalSelfReference.allMachineData = data;

           var mName = document.getElementById("machineName");
           var mID = document.getElementById("machineID");
           var mTemperature = document.getElementById("machineTemperature");
           var mRuntime = document.getElementById("machineRuntime");
           var ePower = document.getElementById("enginePower");
           var eOperationTime = document.getElementById("engineOperationTime");
           var eLastService = document.getElementById("engineLastService");

           var Maschine1 = machineServer.allMachineData.Maschine1;
           var Maschine2 = machineServer.allMachineData.Maschine2;
           var Maschine3 = machineServer.allMachineData.Maschine3;
           var Maschine4 = machineServer.allMachineData.Maschine4;
           var Maschine5 = machineServer.allMachineData.Maschine5;

        
           arrMainInformation.machine1[0] = Maschine1.identifikation;
           arrMainInformation.machine1[1] = Maschine1.temperatur;
           arrMainInformation.machine1[2] = Maschine1.durchgängigeLaufzeit;
           arrMainInformation.machine1[3] = Maschine1.Motor.aktuelleLeistung;
           arrMainInformation.machine1[4] = Maschine1.Motor.betriebsminutenGesamt;
           arrMainInformation.machine1[5] = Maschine1.Motor.letzteWartung;

           arrMainInformation.machine2[0] = Maschine2.identifikation;
           arrMainInformation.machine2[1] = Maschine2.temperatur;
           arrMainInformation.machine2[2] = Maschine2.durchgängigeLaufzeit;
           arrMainInformation.machine2[3] = Maschine2.Motor.aktuelleLeistung;
           arrMainInformation.machine2[4] = Maschine2.Motor.betriebsminutenGesamt;
           arrMainInformation.machine2[5] = Maschine2.Motor.letzteWartung;

           arrMainInformation.machine3[0] = Maschine3.identifikation;
           arrMainInformation.machine3[1] = Maschine3.temperatur;
           arrMainInformation.machine3[2] = Maschine3.durchgängigeLaufzeit;
           arrMainInformation.machine3[3] = Maschine3.Motor.aktuelleLeistung;
           arrMainInformation.machine3[4] = Maschine3.Motor.betriebsminutenGesamt;
           arrMainInformation.machine3[5] = Maschine3.Motor.letzteWartung;
    
           arrMainInformation.machine4[0] = Maschine4.identifikation;
           arrMainInformation.machine4[1] = Maschine4.temperatur;
           arrMainInformation.machine4[2] = Maschine4.durchgängigeLaufzeit;
           arrMainInformation.machine4[3] = Maschine4.Motor.aktuelleLeistung;
           arrMainInformation.machine4[4] = Maschine4.Motor.betriebsminutenGesamt;
           arrMainInformation.machine4[5] = Maschine4.Motor.letzteWartung;

           arrMainInformation.machine5[0] = Maschine5.identifikation;
           arrMainInformation.machine5[1] = Maschine5.temperatur;
           arrMainInformation.machine5[2] = Maschine5.durchgängigeLaufzeit;
           arrMainInformation.machine5[3] = Maschine5.Motor.aktuelleLeistung;
           arrMainInformation.machine5[4] = Maschine5.Motor.betriebsminutenGesamt;
           arrMainInformation.machine5[5] = Maschine5.Motor.letzteWartung;

           switch(selectedMachine){
            case "nodeMachine1":
                mName.innerHTML = "Maschine 1";
                mID.innerHTML = arrMainInformation.machine1[0];
                mTemperature.innerHTML = arrMainInformation.machine1[1] + "C";
                mRuntime.innerHTML = arrMainInformation.machine1[2];
                ePower.innerHTML = arrMainInformation.machine1[3];
                eOperationTime.innerHTML = arrMainInformation.machine1[4];
                eLastService.innerHTML = arrMainInformation.machine1[5];
                break;
            case "nodeMachine2":
                mName.innerHTML = "Maschine 2";
                mID.innerHTML = arrMainInformation.machine2[0];
                mTemperature.innerHTML = arrMainInformation.machine2[1] + "C";
                mRuntime.innerHTML = arrMainInformation.machine2[2];
                ePower.innerHTML = arrMainInformation.machine2[3];
                eOperationTime.innerHTML = arrMainInformation.machine2[4];
                eLastService.innerHTML = arrMainInformation.machine2[5];
                break;
            case "nodeMachine3":
                mName.innerHTML = "Maschine 3";
                mID.innerHTML = arrMainInformation.machine3[0];
                mTemperature.innerHTML = arrMainInformation.machine3[1] + "C";
                mRuntime.innerHTML = arrMainInformation.machine3[2];
                ePower.innerHTML = arrMainInformation.machine3[3];
                eOperationTime.innerHTML = arrMainInformation.machine3[4];
                eLastService.innerHTML = arrMainInformation.machine3[5];
                break;
            case "nodeMachine4":
                mName.innerHTML = "Maschine 4";
                mID.innerHTML = arrMainInformation.machine4[0];
                mTemperature.innerHTML = arrMainInformation.machine4[1] + "C";
                mRuntime.innerHTML = arrMainInformation.machine4[2];
                ePower.innerHTML = arrMainInformation.machine4[3];
                eOperationTime.innerHTML = arrMainInformation.machine4[4];
                eLastService.innerHTML = arrMainInformation.machine4[5];
                break;
            case "nodeMachine5":
                mName.innerHTML = "Maschine 5";
                mID.innerHTML = arrMainInformation.machine5[0];
                mTemperature.innerHTML = arrMainInformation.machine5[1] + "C";
                mRuntime.innerHTML = arrMainInformation.machine5[2];
                ePower.innerHTML = arrMainInformation.machine5[3];
                eOperationTime.innerHTML = arrMainInformation.machine5[4];
                eLastService.innerHTML = arrMainInformation.machine5[5];
                break;
        };

            for(var x in temperatureChart){
                switch(x){
                    case "machine1":
                        var temperature = machineServer.allMachineData.Maschine1.temperatur.replace("°","");
                    
                        if (temperatureChart.machine1.length < 30) {
                            temperatureChart.machine1.push(temperature);
                          } else {
                            temperatureChart.machine1.shift();
                            temperatureChart.machine1.push(temperature);
                          }
                        break;
                    case "machine2":
                        var temperature = machineServer.allMachineData.Maschine2.temperatur.replace("°","");
                            
                        if (temperatureChart.machine2.length < 30) {
                            temperatureChart.machine2.push(temperature);
                        } else {
                            temperatureChart.machine2.shift();
                            temperatureChart.machine2.push(temperature);
                        }
                        break;
                    case "machine3":
                        var temperature = machineServer.allMachineData.Maschine3.temperatur.replace("°","");
                            
                        if (temperatureChart.machine3.length < 30) {
                            temperatureChart.machine3.push(temperature);
                        } else {
                            temperatureChart.machine3.shift();
                            temperatureChart.machine3.push(temperature);
                        }
                        break;
                    case "machine4":
                        var temperature = machineServer.allMachineData.Maschine4.temperatur.replace("°","");
                            
                        if (temperatureChart.machine4.length < 30) {
                            temperatureChart.machine4.push(temperature);
                        } else {
                            temperatureChart.machine4.shift();
                            temperatureChart.machine4.push(temperature);
                        }
                        break;
                    case "machine5":
                        var temperature = machineServer.allMachineData.Maschine5.temperatur.replace("°","");
                            
                        if (temperatureChart.machine5.length < 30) {
                            temperatureChart.machine5.push(temperature);
                        } else {
                            temperatureChart.machine5.shift();
                            temperatureChart.machine5.push(temperature);
                        }
                        break;
                }
            };

            for(var x in performanceChart){
                switch(x){
                    case "machine1":
                        var performance = machineServer.allMachineData.Maschine1.Motor.aktuelleLeistung.replace("%","");
                    
                        if (performanceChart.machine1.length < 30) {
                            performanceChart.machine1.push(performance);
                          } else {
                            performanceChart.machine1.shift();
                            performanceChart.machine1.push(performance);
                          }
                        break;
                    case "machine2":
                        var performance = machineServer.allMachineData.Maschine2.Motor.aktuelleLeistung.replace("%","");
                            
                        if (performanceChart.machine2.length < 30) {
                            performanceChart.machine2.push(performance);
                        } else {
                            performanceChart.machine2.shift();
                            performanceChart.machine2.push(performance);
                        }
                        break;
                    case "machine3":
                        var performance = machineServer.allMachineData.Maschine3.Motor.aktuelleLeistung.replace("%","");
                            
                        if (performanceChart.machine3.length < 30) {
                            performanceChart.machine3.push(performance);
                        } else {
                            performanceChart.machine3.shift();
                            performanceChart.machine3.push(performance);
                        }
                        break;
                    case "machine4":
                        var performance = machineServer.allMachineData.Maschine4.Motor.aktuelleLeistung.replace("%","");
                            
                        if (performanceChart.machine4.length < 30) {
                            performanceChart.machine4.push(performance);
                        } else {
                            performanceChart.machine4.shift();
                            performanceChart.machine4.push(performance);
                        }
                        break;
                    case "machine5":
                        var performance = machineServer.allMachineData.Maschine5.Motor.aktuelleLeistung.replace("%","");
                            
                        if (performanceChart.machine5.length < 30) {
                            performanceChart.machine5.push(performance);
                        } else {
                            performanceChart.machine5.shift();
                            performanceChart.machine5.push(performance);
                        }
                        break;
                }
            };
            tempChart.update();
            performChart.update();
            });
        serverCommunication.open("GET", dataURL, true);
        serverCommunication.send();
        },
};

function updateData(){
    machineServer.getData("http://bsedemoserver.azurewebsites.net/machines");
};

function changeDataset(nodeID) {
    selectedMachine = nodeID;
    localStorage.setItem("lsSelectedMachine", selectedMachine);

    console.log("Selektierte Maschine: " + selectedMachine);

    switch(nodeID){
        case "nodeMachine1":
            selectedDataset = temperatureChart.machine1;
            tempChart.data.datasets[0].data = selectedDataset;
            tempChart.reset();
            selectedDatasetPerformance = performanceChart.machine1;
            performChart.data.datasets[0].data = selectedDatasetPerformance;
            performChart.reset();
            break;
        case "nodeMachine2":
            selectedDataset = temperatureChart.machine2;
            tempChart.data.datasets[0].data = selectedDataset;
            tempChart.reset();
            selectedDatasetPerformance = performanceChart.machine2;
            performChart.data.datasets[0].data = selectedDatasetPerformance;
            performChart.reset();
            break;
        case "nodeMachine3":
            selectedDataset = temperatureChart.machine3;
            tempChart.data.datasets[0].data = selectedDataset;
            tempChart.reset();
            selectedDatasetPerformance = performanceChart.machine3;
            performChart.data.datasets[0].data = selectedDatasetPerformance;
            performChart.reset();
            break;
        case "nodeMachine4":
            selectedDataset = temperatureChart.machine4;
            tempChart.data.datasets[0].data = selectedDataset;
            tempChart.reset();
            selectedDatasetPerformance = performanceChart.machine4;
            performChart.data.datasets[0].data = selectedDatasetPerformance;
            performChart.reset();
            break;
        case "nodeMachine5":
            selectedDataset = temperatureChart.machine5;
            tempChart.data.datasets[0].data = selectedDataset;
            tempChart.reset();
            selectedDatasetPerformance = performanceChart.machine5;
            performChart.data.datasets[0].data = selectedDatasetPerformance;
            performChart.reset();
            break;
    };
};

function setColors(){
    tempChart.data.datasets[0].borderColor = chartColor;
    tempChart.data.datasets[0].backgroundColor = areaColor;
    tempChart.reset();

    localStorage.setItem("lsChartColor", chartColor);
    localStorage.setItem("lsAreaColor", areaColor);
};

function update(picker) {
    chartColor = picker.toHEXString();
    areaColor = 'rgba(' + Math.round(picker.rgb[0]) + ', ' + Math.round(picker.rgb[1]) + ', ' + Math.round(picker.rgb[2]) + ', 0.2)';
};

function openModal(){
    var modal = document.getElementById("modalBox");
    modal.style.display = "block";
};

function closeModal(){
    var modal = document.getElementById("modalBox");
    var inputValue = document.getElementById("inputAlarmLevel");
    var divAlert = document.getElementById("alertLevel");

    modal.style.display = "none";
    divAlert.innerHTML = inputValue.value + "°C";
    localStorage.setItem("lsAlarmLevel", inputValue.value);
};

function openFullscreen(element) {
    var elem = document.getElementById(element);

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { //für Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { //Chrome, Safari & Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { //IE/Edge
        elem.msRequestFullscreen();
    }
};

function closeFullscreen() {
    if (document.exitFullscreen) {
    document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
    }
  };


// const url = 'http://127.0.0.1:5500/data.json';
const url = './data.json';

fetch(url)
    .then(res => res.json())
    .then(data => {
        // showData(data);
        let netral = 0;
        let positif = 0;
        let negatif = 0;
        data.forEach(element => {
            if (element.label === 0) {
                netral+=1;
            } else if (element.label === 1) {
                positif+=1;
            } else {
                negatif+=1;
            }
        });
        let persenSentimen = [netral, positif, negatif];
        createPie(persenSentimen);
        createBar(persenSentimen);
    }); 

    function createPie(dtPie) {
    let chart = document.getElementById('pie').getContext('2d');
    const data = {
        labels: [
          'Netral',
          'Positif',
          'Negatif'
        ],
        datasets: [{
          data: dtPie,
          label: 'Data Sentimen',
          backgroundColor: [
            '#fbf002',
            '#1e9600',
            '#fe0002'
          ],
          hoverOffset: 8
        }]
      };

    const config = {
        type: 'pie',
        data: data,
        options: {
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: false,
                    text: 'Pie Chart',
                    font: {
                        size: 17,
                        weight: 'normal'
                    }
                }
            }
        }
    };

    const pie = new Chart(
        chart,
        config
    )
}

function createBar(data) {
    let chart = document.getElementById('bar').getContext('2d');
    const data2 = {
        labels: [
          'Netral',
          'Positif',
          'Negatif'
        ],
        datasets: [{
          data: data,
          backgroundColor: [
            '#fbf002',
            '#1e9600',
            '#fe0002'
          ],
        }]
      };

    const config = {
        type: 'bar',
        data: data2,
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'none'
                },
                title: {
                    display: false,
                    text: 'Bar Chart',
                    font: {
                        size: 17,
                        weight: 'normal'
                    }
                }
            }
        }
    };

    const pie = new Chart(
        chart,
        config
    )
}

// const urlHistory = "http://127.0.0.1:5500/historymodel.json";
const urlHistory = "./historymodel.json";


fetch(urlHistory)
    .then(res => res.json())
    .then(data => {
        createLinePlot(data);
    })

function createLinePlot(history) {
    let numArray = Object.getOwnPropertyNames(history).sort();
    let allLength = [];
    for (let i = 1; i <= history.accuracy.length; i++) {
        allLength.push(i);
    }

    let showhistory = [];
    let custHis = history.accuracy
    custHis.forEach(element => {
        showhistory.push(element);
    });

    let showhistory1 = [];
    let custHis1 = history.loss
    custHis1.forEach(element => {
        showhistory1.push(element);
    });

    let showhistory2 = [];
    let custHis2 = history.val_accuracy
    custHis2.forEach(element => {
        showhistory2.push(element);
    });
    let showhistory3 = [];
    let custHis3 = history.val_loss
    custHis3.forEach(element => {
        showhistory3.push(element);
    });
    // const color = ['#542e71', '#fb3640', '#fdca40', '#a799b7']

    numArray.forEach(element => {
        if (element === 'accuracy') {
            defLinePlot(element, showhistory, allLength, `${element} Training`, '#542e71');            
        }
        if (element === 'loss') {
            defLinePlot(element, showhistory1, allLength, `${element} Training`, '#fb3640');            
        }
        if (element === 'val_accuracy') {
            defLinePlot(element, showhistory2, allLength, element, '#fdca40');            
        }
        if (element === 'val_loss') {
            defLinePlot(element, showhistory3, allLength, element, '#a799b7');            
        }
    });
}

function defLinePlot(id, showHis, loop, locPlot, color) {
    let getPos = document.getElementById(id).getContext('2d');
    const labels = loop;
    const data = {
        labels: labels,
        datasets: [{
            label: `Plot ${locPlot}`,
            data: showHis,
            fill: false,
            borderColor: color
        }]
    };
    const config = {
        type: 'line',
        data: data
      };

    const line = new Chart(
        getPos, 
        config
    )
}
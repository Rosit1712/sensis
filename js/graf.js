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
        let persenSentimen = [netral,positif, negatif];
        createPie(persenSentimen);
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
            '#d8e3e7',
            '#51c4d3',
            '#ce1212'
          ],
          hoverOffset: 4
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
                    display: true,
                    text: 'Persentase Sentimen',
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
    // const config2 = {
    //     type: 'bar',
    //     data: data,
    //     options: {
    //         indexAxis: 'y',
    //         plugins: {
    //             legend: {
    //                 display: false
    //             }
    //         },
    //         scales: {
    //             x: {
    //                 display: false
    //             }
    //         }
    //     }
    // };
    // const getBar = document.getElementById('bar');
    // const  bar = new Chart(
    //     getBar,
    //     config2
    // )
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
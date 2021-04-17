const url = 'http://127.0.0.1:5500/data.json';

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

function showData(data) {
    createTable(data);

    let getId = document.querySelectorAll('table');
    let id = [];
    getId.forEach(element => {
        id.push(element.id);
    });
    let parentTab = document.getElementById('range');
    id.forEach(nil => {
        parentTab.innerHTML += `
        <li class="tab col 1"><a href="#${nil}">${nil}</a></li>
        `;
    });
    M.Tabs.init(parentTab);
    let counter = 1;
    let idTabel;
    for (let i = 0; i < id.length; i++) {
        if (id[counter] === id[id.length-1]) {
            // console.log(`${id[i]} - ${id[counter]}`);
            idTabel = document.getElementById(id[i]);
            let num = 1;
            data.forEach(element => {
                if (data.indexOf(element) >= id[i] && data.indexOf(element) < id[counter]) {
                    // console.log(data.indexOf(element))
                    let rowMake = idTabel.insertRow();

                    rowMake.insertCell(0).innerHTML = num;
                    rowMake.insertCell(1).innerHTML = element.text;
                    rowMake.insertCell(2).innerHTML = element.label;
                    num+=1;
                }
            }); 
        } else {
            if (counter > id.length-1) {
                // console.log(`${id[i]} - ${data.length}`);
                idTabel = document.getElementById(id[i])
                let num = 1;
                data.forEach(element => {
                    if (data.indexOf(element) >= id[i] && data.indexOf(element) < data.length) {
                        // console.log(data.indexOf(element))
                        let rowMake = idTabel.insertRow();

                        rowMake.insertCell(0).innerHTML = num;
                        rowMake.insertCell(1).innerHTML = element.text;
                        rowMake.insertCell(2).innerHTML = element.label;
                        num+=1;
                    }
                }); 
            } else {
                idTabel = document.getElementById(id[i])
                let num = 1;
                data.forEach(element => {
                    if (data.indexOf(element) >= id[i] && data.indexOf(element) < id[counter]) {
                        // console.log(data.indexOf(element))
                        let rowMake = idTabel.insertRow();
    
                        rowMake.insertCell(0).innerHTML = num;
                        rowMake.insertCell(1).innerHTML = element.text;
                        rowMake.insertCell(2).innerHTML = element.label;
                        num+=1;
                    }
                }); 
                // console.log(`${id[i]} - ${id[counter]}`);
            }
        }
        counter+=1;
    }
}

function createTable(data) {
    let counter = 99 ;
    for (let i = 0; i < data.length; i++) {
        if (i % 100 === 0) {
        let body = document.getElementById('data');
        // let createTitle = document.createElement('h6');
        let node;
            if (i === 2500) {
                node = document.createTextNode(`Range ${i}-${data.length}`);
            } else {
                node = document.createTextNode(`Range ${i}-${counter}`);
            }
        // createTitle.appendChild(node);
        // body.appendChild(createTitle);

        let createTable = document.createElement('table');
        createTable.id = i;
        body.appendChild(createTable);

        let getTable = document.getElementById(i);
        let thead = getTable.createTHead();
        let row = thead.insertRow(0);
        
        row.insertCell(0).innerHTML = 'No';
        row.insertCell(1).innerHTML = 'Text';
        row.insertCell(2).innerHTML = 'Label';

        counter +=100;
        }
    }
}

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
}

const urlHistory = "http://127.0.0.1:5500/historymodel.json";

fetch(urlHistory)
    .then(res => res.json())
    .then(data => {
        createLinePlot(data);
    })

function createLinePlot(history) {
    let numArray = Object.getOwnPropertyNames(history).sort();
    console.log(numArray)

    console.log(history)
    let showhistory = [];
    let loop = [];
    let custHis = history.accuracy
    custHis.forEach(element => {
        // console.log(element);
        showhistory.push(element);
        loop.push(showhistory.indexOf(element)+1)
    });

    let showhistory1 = [];
    let loop1 = [];
    let custHis1 = history.loss
    custHis1.forEach(element => {
        // console.log(element);
        showhistory1.push(element);
        loop1.push(showhistory1.indexOf(element)+1)
    });

    let showhistory2 = [];
    let loop2 = [];
    let custHis2 = history.val_accuracy
    custHis2.forEach(element => {
        // console.log(element);
        showhistory2.push(element);
        loop2.push(showhistory2.indexOf(element)+1)
    });

    let showhistory3 = [];
    let loop3 = [];
    let custHis3 = history.val_loss
    custHis3.forEach(element => {
        // console.log(element);
        showhistory2.push(element);
        loop2.push(showhistory2.indexOf(element)+1)
    });

    numArray.forEach(element => {
        if (element === 'accuracy') {
            defLinePlot(element, showhistory, loop, element);            
        }
        if (element === 'loss') {
            defLinePlot(element, showhistory1, loop1, element);            
        }
        if (element === 'val_accuracy') {
            defLinePlot(element, showhistory2, loop2, element);            
        }
        if (element === 'val_loss') {
            defLinePlot(element, showhistory3, loop3, element);            
        }
    });
    // defLinePlot('trainacc', showhistory, loop, 'accuracy');
    // let getPos = document.getElementById('trainacc').getContext('2d');

    // const labels = loop;
    // const data = {
    //     labels: labels,
    //     datasets: [{
    //         label: 'Plot Loss Training',
    //         data: showhistory,
    //         fill: false,
    //         borderColor: 'rgb(75, 192, 192)'
    //     }]
    // };
    // const config = {
    //     type: 'line',
    //     data: data,
    //   };

    // const line = new Chart(
    //     getPos, 
    //     config
    // )
}

function defLinePlot(id, showHis, loop, locPlot) {
    let getPos = document.getElementById(id).getContext('2d');
    const labels = loop;
    const data = {
        labels: labels,
        datasets: [{
            label: `Plot ${locPlot} Training`,
            data: showHis,
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
        }]
    };
    const config = {
        type: 'line',
        data: data,
      };

    const line = new Chart(
        getPos, 
        config
    )
}
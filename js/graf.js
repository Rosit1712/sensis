const url = 'http://127.0.0.1:5500/data.json';

fetch(url)
    .then(res => res.json())
    .then(data => {
        // showData(data);

        createChart();
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

function createChart() {
    let chart = document.getElementById('pie').getContext('2d');
    let myPie = new Chart(chart, {
        type: 'pie',
        data: {
            // labels: ['Red', 'Blue', 'Yellow'],
            labels: ['Positif', 'Netral', 'Negatif'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

const urlHistory = "http://127.0.0.1:5500/historymodel.json";

fetch(urlHistory)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
    })

function createPie() {
    
}
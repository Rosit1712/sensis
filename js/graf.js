const url = 'http://127.0.0.1:5500/data.json';

fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data.slice(0, 100));
        showData(data);
    }); 

function showData(data) {
    createTable(data);

    let getId = document.querySelectorAll('table');
    let id = [];
    getId.forEach(element => {
        id.push(element.id);
    });
    // let counter = 1;
    // for (let i = 0; i < id.length; i++) {
    //     if (id[counter] === id[id.length-1]) {
    //         console.log(`${id[i]} - ${id[counter]}`);
    //     } else {
    //         if (counter > id.length-1) {
    //             console.log(`${id[i]} - ${data.length}`);
    //         } else {
    //             console.log(`${id[i]} - ${id[counter]}`);
    //         }
    //     }
    //     counter+=1;
    // }
    // for (let i = 0; i < data.length; i+100) {
    //     console.log(i)     
    // }    
    // let rowMake = thead.insertRow();
    // rowMake.insertCell(0).innerHTML = slices+=1;
    // rowMake.insertCell(1).innerHTML = data[i].text;
    // rowMake.insertCell(2).innerHTML = data[i].label;
    // let body = document.getElementById('data');
    // let createTable = document.createElement('table');
    // body.appendChild(createTable);

    // let getTable = document.querySelector('table');
    // let thead = getTable.createTHead();
    // let row = thead.insertRow(0);
    
    // row.insertCell(0).innerHTML = 'No';
    // row.insertCell(1).innerHTML = 'Text';
    // row.insertCell(2).innerHTML = 'Label';
    // let num = 0;
    // data.forEach(e => {
    //     let b = thead.insertRow();
    //     b.insertCell(0).innerHTML = num+=1;
    //     b.insertCell(1).innerHTML = e.text;
    //     b.insertCell(2).innerHTML = e.label;
        
    // });

}

function createTable(data) {
    let counter = 99 ;
    for (let i = 0; i < data.length; i++) {
        if (i % 100 === 0) {
        let body = document.getElementById('data');
        let createTitle = document.createElement('h6');
        let node;
            if (i === 2500) {
                node = document.createTextNode(`Range ${i}-${data.length}`);
            } else {
                node = document.createTextNode(`Range ${i}-${counter}`);
            }
        createTitle.appendChild(node);
        body.appendChild(createTitle);

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
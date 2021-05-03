let model;
let word2index;
let dt;
// let loadModel = false;
const maxlen = 40;
const vocab_size = 2000;
const padding = 'post';
const truncating = 'post';

const srcModel = './model.json';
const srcWidx = './word2index.json';

// const srcModel = 'http://127.0.0.1:5500/model.json';
// const srcWidx = 'http://127.0.0.1:5500/word2index.json';
async function init() {
  model = await tf.loadLayersModel(srcModel);
  // loadModel = true;

  const word2indexjson = await fetch(srcWidx);
  word2index = await word2indexjson.json();

  // const datadf = await fetch('http://127.0.0.1:8887/data.json');
  // dt = await datadf.json();

  // console.log(dt[0].text);
  console.log('Model Loaded Success');
}

// console.log(loadModel);
document.addEventListener('DOMContentLoaded', function() {
  init();
  const kos = document.getElementById('search');
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (kos.value === '') {
        alert('Isi dulu inputnya!!!');
      } else {
        showRes();
      }
    }
  });
  document.getElementById('analyze').addEventListener('click', () => {
    if (kos.value === '') {
      alert('Isi dulu inputnya!!!');
    } else {
      showRes();
    }
  });
});

function getText() {
  let text = document.getElementById('search').value;
  text = text.replace(/[^\w\s]|[0-9]/g, ' ').trim().toLowerCase().split(" ");
  text = text.filter(item => item);
  return text;
}

function padSequence(sequences, maxLen, padding='post', truncating = "post", pad_value = 0){
  return sequences.map(seq => {
      if (seq.length > maxLen) { //truncat
          if (truncating === 'pre'){
              seq.splice(0, seq.length - maxLen);
          } else {
              seq.splice(maxLen, seq.length - maxLen);
          }
      }
              
      if (seq.length < maxLen) {
          const pad = [];
          for (let i = 0; i < maxLen - seq.length; i++){
              pad.push(pad_value);
          }
          if (padding === 'pre') {
              seq = pad.concat(seq);
          } else {
              seq = seq.concat(pad);
          }
      }               
      return seq;
      });
}

function predict(inputText){

  //return console.log(model.summary());
  //return console.log(word2index['food']);
  const sequence = inputText.map(word => {
      let indexed = word2index[word];

      if (indexed === undefined){
          return 1; //change to oov value
      }
      return indexed;
  });
  
  const paddedSequence = padSequence([sequence], maxlen);

  const score = tf.tidy(() => {
      const input = tf.tensor2d(paddedSequence, [1, maxlen]);
      const result = model.predict(input);
      // console.log(result.dataSync());
      let predictSen = '';
      let p = Math.max(...result.dataSync());
      if (result.dataSync().indexOf(p) === 0) {
        // console.log('Netral', p);
        predictSen = 'Netral';
        // writeSen.innerHTML = `Netral`;
      } else if (result.dataSync().indexOf(p) === 1) {
        // console.log('Positif', p);
        predictSen = 'Positif';
        // writeSen.innerHTML = `Positif`;
      } else {
        // console.log('Negatif', p);
        predictSen = 'Negatif';
        // writeSen.innerHTML = `Negatif`;
      }
      return {
        p,
        predictSen
      };
  });
  return score;

}

function textGet() {
  let text = document.getElementById('search').value;
  text = text.replace(/[^\w\s]|[0-9]/g, ' ').trim().toLowerCase();
  return text;
}

function showRes() {
  // let text  = document.getElementById('search').value;
  // console.log(coba);
  const textTweet = getText();
  const txt = textGet();
  // let score = predict(textTweet);
  let pred = predict(textTweet);

  let tabel = document.getElementById('tabel');
  let sentimen = '';
  // if (score > 0.5) {
  //   sentimen ='Positive Review';
  // } else {
  //   sentimen ='Negative Review';
  // }

  tabel.innerHTML = `
  <table>
  <tr>
    <th>TEXT</th>
    <td>${txt}</td>
  </tr>
    <tr>
        <th>RESULT</th>
        <td>${pred.predictSen}</td>
    </tr>
    <tr>
        <th>ACCURACY</th>
        <td>${pred.p * 100} %</td>
    </tr>
  </table>
  <a class="waves-effect waves-light btn amber darken-2" id="clear">clear</a>
  `;
  document.getElementById('clear').addEventListener('click', () => {
    // coba = '';
    document.getElementById('search').value = '';
    tabel.innerHTML = '';
  });
}
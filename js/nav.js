document.addEventListener('DOMContentLoaded', () => {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  const button = document.querySelector('button');
  window.onscroll = () => {scrollFunction(button)};
  button.addEventListener('click', () => {
    topFunc();
  })
})

function scrollFunction(button) {
  if (document.body.scroll > 20 || document.documentElement.scrollTop >20) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}

function topFunc() {
  document.body.scrollTop = 0 //safari
  document.documentElement.scrollTop = 0 //non safari
}
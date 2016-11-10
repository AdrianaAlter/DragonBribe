window.addEventListener('load', function(e) {

  JEWELS = [
    'diamond1',
    'diamond2',
    'diamond3',
    'diamond4',
    'diamond5',
    'diamond6',
    'diamond7',
    'diamond8',
    'diamond9',
    'diamond10',
    'sapphire1',
    'sapphire2',
    'sapphire3',
    'amber',
    'ruby1',
    'ruby2',
    'amethyst1',
    'amethyst2',
    'amethyst3',
    'emerald1',
    'emerald2',
    'jasper',
    'topaz'
  ];

  var basket = document.getElementById('basket');
  var gamespace = document.getElementById('gamespace');
  var gameWon = document.getElementById('game-won');
  var gameLost = document.getElementById('game-lost');
  var jewels = document.getElementsByClassName('jewel');
  var welcome = document.getElementById('welcome');
  var score = document.getElementsByTagName('h3')[0];
  var timer = document.getElementsByTagName('h3')[1];
  var buttons = document.getElementsByTagName('button');
  var audio = document.getElementsByTagName('audio')[0];
  var muteButton = document.getElementsByTagName('li')[2];
  var mute = false;
  var music = new Audio("sounds/music.mp3");

  function play() {
    var music = musicInit();
    welcome.style.display = "none";
    gameWon.style.display = "none";
    gameLost.style.display = "none";
    gamespace.style.display = "block";
    timeLeft = 31;
    scoreNum = 0;
    setInterval(addJewels, 1500);
    catchJewels();
    countDown();
    score.innerHTML = scoreNum;
    basket.style.left = "0";
  }

  function musicInit(){
    if (!mute){
      music.play();
    }
    var muteIcon = document.createElement("i");
    muteIcon.className = "fa fa-volume-off fa-2x";
    muteButton.appendChild(muteIcon);

    function toggleMute() {
      mute ? mute = false : mute = true;
      muteIcon.className = mute ? "fa fa-volume-up fa-2x" : "fa fa-volume-off fa-2x";
      music.muted === false ? music.muted = true : music.muted = false;
    }
    muteButton.addEventListener('click', toggleMute);
  }


  buttons[0].addEventListener('click', play);
  buttons[1].addEventListener('click', reset);
  buttons[2].addEventListener('click', reset);

  function reset() {
    location.reload();
    autoStart = true;
  }

  function addJewels() {
    for (var i = 0; i < 5; i++) {
      var jewel = document.createElement('section');
      var jewelX = Math.random() * 100;
      var jewelSpeed = Math.floor(Math.random() * (10 - 2)) + 2 + 's';
      var jewelIdx = Math.floor(Math.random() * JEWELS.length);
      jewel.className = 'jewel';
      jewel.style.left = jewelX + "%";
      var urlStart = "url('./images/elements/jewels/";
      var urlJewel = JEWELS[jewelIdx] + ".png";
      var urlEnd = "')";
      jewel.style.backgroundImage = urlStart + urlJewel + urlEnd;
      jewel.style.animation = "fall " + jewelSpeed + " forwards";
      gamespace.appendChild(jewel);
    }
  };


  function catchJewels(){
    setInterval(isCaught, 1);
  };

  function moveBasket(e) {
    var margin = parseInt(getComputedStyle(gamespace).marginLeft.split("p")[0]);
    var basketLeft = parseInt(getComputedStyle(basket).left);
    var basketWidth = parseInt(getComputedStyle(basket).width.split("p")[0]);
    var step = basketWidth / 5;
    var gameRight = parseInt(getComputedStyle(document.getElementsByTagName("body")[0]).width.split("p")[0]) - margin;

    if (e.keyCode == 37) {
      if (basketLeft - step >= 0) {
        basket.style.left = (basketLeft - step) + 'px';
      }
    }
    else if (e.keyCode == 39) {
      if (basketLeft + basketWidth + step + margin <= gameRight) {
        basket.style.left = (basketLeft + step) + 'px';
      }
    }
  };

  document.addEventListener('keydown', function(e){
    if (e.keyCode == 37 || e.keyCode == 39) {
      e.preventDefault();
      moveBasket(e);
    }
  });

  function isCaught() {

    for (var i = 0; i < jewels.length; i++) {
      var jewelBottom = jewels[i].getBoundingClientRect().bottom;
      var jewelLeft = jewels[i].getBoundingClientRect().left;
      var jewelRight = jewels[i].getBoundingClientRect().right;
      var basketTop = basket.getBoundingClientRect().top;
      var basketBottom = basket.getBoundingClientRect().bottom;
      var basketLeft = basket.getBoundingClientRect().left;
      var basketRight = basket.getBoundingClientRect().right;
      var basketHeight = basketBottom - basketTop;
      var half = basketHeight / 2;
      var quarter = half / 2;
      var threeQuarters = half + quarter;
      var threeQuartersHeight = basketTop + threeQuarters;

      if (jewelRight > basketLeft && jewelLeft < basketRight) {
        if (jewelBottom >= basketTop && jewelBottom <= threeQuartersHeight) {
          jewels[i].style.display = "none";
          var sound = new Audio("sounds/sound.wav");
          if (!mute){
            sound.play();
          }
          scoreNum += 1;
          score.innerHTML = scoreNum;
        }
      }
      else if (jewelBottom <= 0) {
        jewels[i].style.display = "none";
      }
    }
  };

  function tick(){
    timeLeft -= 1;
    if (gamespace.style.display != "none") {
      timeLeft >= 0 ? timer.innerHTML = timeLeft : gameOver();
    }
  };

  function countDown(){
    setInterval(tick, 1000);
  };

  function gameOver(){
    music.pause();
    music = new Audio("sounds/music.mp3");
    var chord = new Audio("sounds/chord.wav");
    if (!mute){
      chord.play();
    }
    gamespace.style.display = "none";
    if (scoreNum >= 50) {
      document.getElementById('game-won').style.display = "block";
      document.getElementById('game-lost').style.display = "none";
    }
    else {
      document.getElementById('game-lost').style.display = "block";
      document.getElementById('game-won').style.display = "none";
    }
  };

});

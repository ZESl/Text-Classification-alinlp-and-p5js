var socket;
var catText = '你好呀！我是聪明的小喵。我能理解你说的话。';
var tbX;
var tbY;

function setup() {
  socket = io.connect('http://localhost:3000');
  socket.on('sendCategory', updateText);
  
  // create canvas with background
  createCanvas(windowWidth, windowHeight);
  background('#FCF8FC');

  // load cat image
  imageMode(CENTER);
  loadImage('cat.png', cat => {
    image(cat, width / 2, height / 2 , 800, 600);
  });

  // draw an input box and a submit button
  tbX = width / 2;
  tbY = height / 2 + 100;
  inputBox = createInput('');
  inputBox.attribute('size', '45');
  inputBox.position(tbX - 20, tbY);
  submitBtn = createButton('submit');
  submitBtn.attribute('size', '100');
  submitBtn.position(tbX + 300, tbY );
  submitBtn.mousePressed(getCategory);
}

function getCategory() {
  // get the values from the input and send text data to server
  const text = inputBox.value();
  socket.emit('getCategory', text);
}

function updateText(data){
  catText = "你是在说：" + data;
}

function draw() {
  // draw a rectangle
  rectMode(CENTER);
  strokeWeight(2);
  stroke('#BA68C8');
  fill('#F8F0FA');
  rect(tbX + 175, tbY - 200, 400, 100, 50); 
  
  // draw the text
  fill(0);
  noStroke();
  textAlign(CENTER);
  textSize(16);
  text(catText, tbX + 175, tbY - 195);
}
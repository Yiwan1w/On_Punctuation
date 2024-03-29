canvas = document.getElementsByTagName('canvas')[0];
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var ctx = canvas.getContext('2d');

var characterList = ['Question Mark', '?', '?', '?', '?', '?', '?', 'Question Mark', '?', '?', '?', '?', '问号', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];

var layers = {
    n: 5, 
    letters: [100, 40, 30, 20, 10], 
    coef: [0.1, 0.2, 0.4, 0.6, 0.8], 
    size: [16, 22, 36, 40, 46], 
    color: ['antiquewhite', '#antiquewhite', 'antiquewhite', 'antiquewhite', 'antiquewhite'],
    font: 'optima' 
};

var characters = [];
var mouseX = document.body.clientWidth/2;
var mouseY = document.body.clientHeight/2;

var rnd = {
    btwn: function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    choose: function(list) {
        return list[rnd.btwn(0, list.length)];
    }
};

function drawLetter(char) {
    ctx.font = char.size + 'px ' + char.font;
    ctx.fillStyle = char.color;
    
    var x = char.posX + (mouseX-canvas.width/2)*char.coef;
    var y = char.posY + (mouseY-canvas.height/2)*char.coef;

    ctx.fillText(char.char, x, y);
}

document.onmousemove = function(ev) {
    mouseX = ev.pageX - canvas.offsetLeft;
    mouseY = ev.pageY - canvas.offsetTop;

    if (window.requestAnimationFrame) {
        requestAnimationFrame(update);
    } else {
        update();
    }
};

function update() {
    clear();
    render();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
    for (var i = 0; i < characters.length; i++) {
        drawLetter(characters[i]);
    }
}

function createLetters() {
    for (var i = 0; i < layers.n; i++) {
        for (var j = 0; j < layers.letters[i]; j++) {

            var character = rnd.choose(characterList);
            var x = rnd.btwn(0, canvas.width);
            var y = rnd.btwn(0, canvas.height);

            characters.push({
                char: character,
                font: layers.font,
                size: layers.size[i],
                color: layers.color[i],
                layer: i,
                coef: layers.coef[i],
                posX: x,
                posY: y
            });

        }
    }
}

createLetters();
update();

window.onresize = function() {
    location.reload();
};

document.getElementById('close').onclick = function() {
    this.parentElement.style.visibility = 'hidden';
    this.parentElement.style.opacity = '0';
}


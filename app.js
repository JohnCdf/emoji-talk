const emojiElement = $("#emoji");
const displayElement = $("#text");

var speakingInterval;

var idle = false;
var blinks = 0;

var backToIdle = function(){
  idle = true;
  blinks = 0;
};

// Models
const expressions = {
  idle: '😐',
  joy: '😃',
  inhale: '😲',
  afraid: '😨',
  ouch: '😵',
  cool: '😎',
  blink: '😑',
  sleep: '😴',
  robot: '🤖'
};

const emojiMap = {
  "😮 ": ["o", "?"],
  "😯": ["u", "w"],
  "😬": ["q", "y", "d", "g", "j", "k", "n", "s", "t", "v", "x", "z", "ñ"],
  "😀 ": ["a", "i", "e", "c", "f", "h", "r", "!"],
  "😐": ["m", "p"],
  "😛": ["l"],
  "😲": [",", " "],
  "🙁": ["b"]
}

// Main functions
function say (text) {
  var i = 0;
  idle = false;

  speakingInterval = setInterval(function(){
    if (i >= text.length) {
      clearInterval(speakingInterval)
      backToIdle();
      return
    };

    var currentEmoji = (Object.keys(emojiMap).find(emoji => emojiMap[emoji].includes(text.charAt(i).toLowerCase()) )) || expressions.idle;
    $(emojiElement).text(currentEmoji);
    $(displayElement).text(text.substring(0, i + 1));
    i ++
  }, 110)
};

function handleOnclick () {
  clearInterval(speakingInterval);
  say($("#main_input__control").val());
}

function isSleepy () {
  return blinks > 4 && idle
};

function blink () {
  if (!idle) return
  $(emojiElement).text(expressions.blink);
  blinks++;
  if (!isSleepy()) {
    setTimeout(function(){
      $(emojiElement).text(expressions.idle);
    }, 100)
  }
}
blinkInterval = setInterval (function(){
    blink();
    if (isSleepy()) {
      setTimeout(function(){
          sleep()
      }, 5000)
    }
}, 4000)

function sleep () {
  $(emojiElement).text(expressions.sleep);
  idle = false;
};

// Event listeners
$("#cdf").hover(function(){
  $(emojiElement).text(expressions.cool)
  idle = false;
}, function(){
  $(emojiElement).text(expressions.idle)
  backToIdle();
})
$("#repo").hover(function(){
  $(emojiElement).text(expressions.robot)
  idle = false;
}, function(){
  $(emojiElement).text(expressions.idle)
  backToIdle();
})
$(emojiElement).hover(function(){
  $(this).text(expressions.afraid)
  idle = false;
}, function(){
  $(this).text(expressions.idle)
  backToIdle();
});

$(emojiElement).mousedown(function(){
  $(this).text(expressions.ouch)
  idle = false;
}).mouseup(function(){
  $(this).text(expressions.idle)
  backToIdle();
})
$("body").ready(function(){
  if (!localStorage.emojiTalk) {
    $("#main_input__control").val("Hello, world!");
    handleOnclick();
    localStorage.emojiTalk = "true";
  }
});
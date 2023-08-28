function fadeIn(element) {
  var val = 0;
  var interval = null;
  clearInterval(interval);
  interval = setInterval(frame, 10);
  function frame() {
    if (val >= 1) {
      clearInterval(interval);
    } else {
      val += 0.05;
      element.style.opacity = val;
    }
  }
}

function fadeOut(element) {
  var val = 1;
  var interval = null;
  clearInterval(interval);
  interval = setInterval(frame, 10);
  function frame() {
    if (val <= 0) {
      clearInterval(interval);
      element.style.display = "None";
    } else {
      val -= 0.05;
      element.style.opacity = val;
    }
  }
}

var intervalBuf = null;
var isAnimating = false;
function showText(pEle, textStr) {
  if (isAnimating) {
    // Stop previous animation before starting the new one
    clearInterval(intervalBuf);
    isAnimating = true;
  }

  pEle.innerHTML = "";
  var index = 0;
  clearInterval(intervalBuf);
  intervalBuf = setInterval(frame, 10);
  function frame() {
    if (index >= textStr.length) {
      clearInterval(intervalBuf);
      isAnimating = false;
    } else {
      pEle.innerHTML += textStr[index];
      index++;
    }
  }
}
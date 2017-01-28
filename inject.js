var no_fingers_web_control = {
  recognition : null,  
  status : false,  
  currentWindow : null,  
  initialize: function() {  
    no_fingers_web_control.currentWindow = window.top;  
    if(window.top.no_fingers_web_control.recognition == null) {
      window.top.no_fingers_web_control.recognition = new webkitSpeechRecognition();
      window.top.no_fingers_web_control.recognition.onresult = window.top.no_fingers_web_control.process;
      window.top.no_fingers_web_control.recognition.continuous = true;
      window.top.no_fingers_web_control.recognition.interimResults = true;
    }    
    window.addEventListener("keydown", no_fingers_web_control.hotKeyDetection);    
    window.addEventListener("focus", function() {
      window.top.no_fingers_web_control.currentWindow = window;
    });
  },
  getActiveElement : function() {
    return window.top.no_fingers_web_control.currentWindow.document.activeElement;
  },
  process : function(event) {    
    var transcript = "";      
    for (var i = event.resultIndex; i < event.results.length; ++i) {      
      if (event.results[i].isFinal) {
        console.log(event.results[i]);        
        transcript += event.results[i][0].transcript;
      } else {
        
      }         
    }          
    no_fingers_web_control.printCharacters(transcript);       
  },  
  printCharacters : function(string) {
    for(var i = 0; i < string.length; ++i) {
      var event = document.createEvent("TextEvent");    
      event.initTextEvent('textInput', true, true, window, string[i], 0, "en-US");
      no_fingers_web_control.getActiveElement().dispatchEvent(event);
    }      
  },
  hotKeyDetection : function(event) {
    // Ctrl shift K
    if (event.ctrlKey === true && event.shiftKey === true && event.keyCode === 75) {      
      no_fingers_web_control.speechToggle();
    }
  },
  speechToggle : function() {
    if(window.top.no_fingers_web_control.status == false) {
      window.top.no_fingers_web_control.recognition.start();        
    }
    else {
      window.top.no_fingers_web_control.recognition.stop();                
    }
    window.top.no_fingers_web_control.status = !window.top.no_fingers_web_control.status;
  },
  voiceCommands : {
    goBack : function() {

    },
    goForward : function() {

    },
    pageUp : function() {

    },
    pageDown : function() {

    },
    scrollUp : function() {

    },
    scrollDown : function() {

    }
  }  
};

no_fingers_web_control.initialize();


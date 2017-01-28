var no_fingers_web_control = {
  recognition : null,  
  status : false,  
  windows : [],
  initialize: function() {
    no_fingers_web_control.recognition = new webkitSpeechRecognition();
    no_fingers_web_control.recognition.onresult = no_fingers_web_control.process;
    no_fingers_web_control.recognition.continuous = true;
    no_fingers_web_control.recognition.interimResults = true;
    window.addEventListener("keydown", no_fingers_web_control.hotKeyDetection);    
  },
  getActiveElement : function() {
    return document.activeElement;
  },
  process : function(event) {    
    var transcript = "";      
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        transcript += event.results[i][0].transcript;
      }         
    }          
    no_fingers_web_control.printCharacters(transcript);       
  },  
  printCharacters : function(string) {
    for(var i = 0; i < string.length; ++i) {
      var event = document.createEvent("TextEvent");    
      event.initTextEvent ('textInput', true, true, window, string[i], 0, "en-US");
      no_fingers_web_control.getActiveElement().dispatchEvent(event);
    }      
  },
  hotKeyDetection : function(event) {
    // Ctrl shift K
    if (event.ctrlKey === true && event.shiftKey === true && event.keyCode === 75) {      
      if(no_fingers_web_control.status == false) {
        no_fingers_web_control.recognition.start();        
      }
      else {
        no_fingers_web_control.recognition.stop();                
      }
      no_fingers_web_control.status = !no_fingers_web_control.status;  
    }
  }
  stopOtherRecording : function(event) {

  }
};

no_fingers_web_control.initialize();


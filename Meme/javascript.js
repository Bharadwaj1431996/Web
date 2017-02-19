    function textChangeListener(evt) {
      var id = evt.target.id;
      var text = evt.target.value;
      console.log("text "+text);
      if (id == "topLineText") {
        window.topLineText = text;
      } else {
        window.bottomLineText = text;
      }

      redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
    }

    function redrawMeme(image, topLine, bottomLine) {
      // Get Canvas2DContext
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext("2d");
      // Your code here
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      function userText(str, y) {
        ctx.font = '36pt Impact';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(str, canvas.width/2, y);
      
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText(str, canvas.width/2, y);
      }
      
      if (topLine != null) {
        userText(topLine, 60);
      };
      if (bottomLine != null) {
        userText(bottomLine, 475);
      };
      
    }

    function saveFile() {
      console.log(document.querySelector('canvas').toDataURL());
      window.open(document.querySelector('canvas').toDataURL());
    }

    function handleFileSelect(evt) {
      var canvasWidth = 500;
      var canvasHeight = 500;
      var file = evt.target.files[0];

      var reader = new FileReader();
      reader.onload = function(fileObject) {
        var data = fileObject.target.result;

        // Create an image object
        var image = new Image();
        image.onload = function() {

          window.imageSrc = this;
          redrawMeme(window.imageSrc, null, null);
        }

        // Set image data to background image.
        image.src = data;
        console.log(fileObject.target.result);
      };
      reader.readAsDataURL(file)
    }

    window.topLineText = "";
    window.bottomLineText = "";
    var input1 = document.getElementById('topLineText');
    console.log("input1 "+input1);
    var input2 = document.getElementById('bottomLineText');
    console.log("input2 "+input2);
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.querySelector('button').addEventListener('click', saveFile, false);
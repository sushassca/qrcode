$(document).ready(function() {

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("#mobile").show();
    $("#web").hide();

    var videoSelect = document.querySelector("select#videoSource");
    var selectors = [videoSelect];

    function gotDevices(deviceInfos) {
      // Handles being called several times to update labels. Preserve values.
      var values = selectors.map(function(select) {
        return select.value;
      });
      selectors.forEach(function(select) {
        while (select.firstChild) {
          select.removeChild(select.firstChild);
        }
      });

      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement("option");
        option.value = deviceInfo.deviceId;

        if (deviceInfo.kind === "videoinput") {
          option.text = deviceInfo.label || "camera " + (videoSelect.length + 1);
          videoSelect.appendChild(option);
        } else {
          console.log("Some other kind of source/device: ", deviceInfo);
        }

        selectors.forEach(function(select, selectorIndex) {
          if (
            Array.prototype.slice.call(select.childNodes).some(function(n) {
              return n.value === values[selectorIndex];
            })
          ) {
            select.value = values[selectorIndex];
          }
        });
      }
    }

    navigator.mediaDevices
      .enumerateDevices()
      .then(gotDevices)
      .catch(handleError);

    function gotStream(stream) {
      arToolkitSource.domElement.srcObject = stream; // make stream available to console
      var  video =  document.getElementById('preview');
      video.srcObject = stream;
      // Refresh button list in case labels have become available
      return navigator.mediaDevices.enumerateDevices();
    }

    function start() {
      if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
          track.stop();
        });
      }
      var videoSource = videoSelect.value;
      var constraints = {
        video: {
          deviceId: videoSource ? {
            exact: videoSource
          } : undefined
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)
        .then(gotDevices)
        .catch(handleError);
    }

    videoSelect.onchange = start;

    function handleError(error) {
      console.log("navigator.getUserMedia error: ", error);
    }

    start();


    let scanner = new Instascan.Scanner({
      video: document.getElementById('preview')
    });
    scanner.addListener('scan', function(content) {
      alert('Escaneou o conteudo: ' + content);
      window.open(content, "_blank");
    });
    Instascan.Camera.getCameras().then(cameras => {
      if (cameras.length > 0) {
        //  scanner.start(cameras[0]);
      } else {
        alert("Não existe câmera no dispositivo!");
      }
    });


  } else {
    $("#web").show();
    $("#mobile").hide();

    function c(b) {
      jQuery(function() {
        jQuery("#output").qrcode({
          render: "table",
          text: b
        });
      });
    }

    $("div.lis").bind("input", function() {
      var b = $("#value").val(),
        a = $("#pass").val();
      b = CryptoJS.AES.encrypt(b, a);
      $("#encrypted").val(b);
      a = CryptoJS.AES.decrypt(b, a);
      $("#decrypted").val(a);
      a = a.toString(CryptoJS.enc.Utf8);
      $("#result").val(a);
      $("#output table").remove();
      c($("#encrypted").val());
    });

    c("  ");
  }
});

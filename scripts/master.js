$(document).ready(function() {
  var options = {
    NOT_AVAILABLE: 'not available',
    ERROR: 'error',
    EXCLUDED: 'excluded',
    fonts: {
      extendedJsFonts: true
    },
    excludes: {
      userAgent: true
    }
  }
  // ############################# FingerPrint
  Fingerprint2.getV18(options, function(result, components) {
    $("#myid").text(result);

    // ############################# Generic API URL
    url = "https://www.jsonstore.io/92995f0b27342cdc1f6be60f928bedb6d776905c17b995f06527de722cedcca5"
    // ############################# Set Request to 0
    update(0);
    // ############################# GET data from api to check if has been updated every 5s
    let req = new XMLHttpRequest();
    var mydeviceidAPI = "";

    function myRequest() {
      req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {

          let data = JSON.parse(req.responseText);

          mydeviceidAPI = data.result.request_deviceID;
          if (data.result.request_status == 1) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            } else {
              //alert("DONE");
              $("#success").show();
            };
            clearInterval(myRequest);
          } else {
            console.log(data.result.request_status);

          }

        }
      };
      req.open("GET", url, true);
      req.setRequestHeader("secret-key", "$2a$10$EVkvuBx5r5NbXv/NgGsVOuUdV1YmUwvo6gCwejsk5tvOn5JrSuh4y");
      req.send();
    }
    var myRequest = setInterval(myRequest, 100);

    // ############################# Update function to update on API
    function update(number) {
      let req = new XMLHttpRequest();
      req.open("PUT", url, true);
      req.setRequestHeader("Content-type", "application/json");
      req.setRequestHeader("secret-key", "$2a$10$EVkvuBx5r5NbXv/NgGsVOuUdV1YmUwvo6gCwejsk5tvOn5JrSuh4y");
      req.send('{"request_id": 0,"request_type": "o nome da acao","request_webID": "9bc8f225ca512656b771145ec31c35d0","request_deviceID": "a16c0d0309b3d795349ce7ac2409774b","request_qrcode": "U2FsdGVkX18kNHtcMiAtbzuy8kBrzIP","request_status": "' + number + '"}');
    }




    // ############################# Check if is mobile or web
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $("#mobile").show();
      $("#web").hide();
      let opts = {
        continuous: true,
        video: document.getElementById('preview'),
        mirror: false,
        captureImage: false,
        backgroundScan: true,
        refractoryPeriod: 5000,
        scanPeriod: 1
      };
      let scanner = new Instascan.Scanner(opts);

      scanner.addListener('scan', function(content) {

        // ############################# decrypt with fingerprint

        a = CryptoJS.AES.decrypt(content, result);
        a = a.toString(CryptoJS.enc.Utf8);
        if (result === mydeviceidAPI) {
          update(1);
          //alert("DONE");
          $("#uniqueID").html("<br><br>Success!!!")
        } else {
          alert("This Qrcode doesnt belong to this DeviceID")
        }
      });

      Instascan.Camera.getCameras().then(function(cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[1]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function(e) {
        console.error(e);
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

      c("U2FsdGVkX1/tByg8GATeVki/fdGWXQfalY+5onNil0U=");
    }
  });
});

$(document).ready(function() {
  // ############################# DATA
  update(0);
  let req = new XMLHttpRequest();

  function myRequest() {
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        let data = JSON.parse(req.responseText);
        if (data.request_status == 1) {
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {


          }else {
              alert("DONE");
          };
          clearInterval(myRequest);
        } else {
          console.log(data.request_status);
        }

      }
    };
    req.open("GET", "https://api.jsonbin.io/b/5d14c6e4138da8111827f1ab/latest", true);
    req.setRequestHeader("secret-key", "$2a$10$EVkvuBx5r5NbXv/NgGsVOuUdV1YmUwvo6gCwejsk5tvOn5JrSuh4y");
    req.send();
  }
  var myRequest = setInterval(myRequest, 2000);


  function update(number) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        //alert(req.responseText);
      }
    };

    req.open("PUT", "https://api.jsonbin.io/b/5d14c6e4138da8111827f1ab", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("secret-key", "$2a$10$EVkvuBx5r5NbXv/NgGsVOuUdV1YmUwvo6gCwejsk5tvOn5JrSuh4y");
    req.send('{"request_status": "' + number + '"}');
  }


  // ############################# FingerPrint
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
  var mydevice = "";
  Fingerprint2.getV18(options, function(result, components) {
    mydevice = result;
  })

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
      a = CryptoJS.AES.decrypt(content, "967b81c170f10afbb56a80f7bb9ac1a8");
      a = a.toString(CryptoJS.enc.Utf8);


      if (a != "") {
        alert(a);
        update(1);
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

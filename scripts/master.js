$(document).ready(function() {
  // ############################# DATA

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
    setTimeout(function () {
          alert(mydevice);
    }, 1000);

    scanner.addListener('scan', function(content) {
      a = CryptoJS.AES.decrypt(content, mydevice);
      a = a.toString(CryptoJS.enc.Utf8);
      alert(a);
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

      var data = new FormData();
      data.append("data", "a27f2efd2ba55eb3eb2815fc870446b0");
      var xhr = new XMLHttpRequest();
      xhr.open('post', 'pending.php', true);
      xhr.send(data);
    });

    c("U2FsdGVkX1/tByg8GATeVki/fdGWXQfalY+5onNil0U=");
  }
});

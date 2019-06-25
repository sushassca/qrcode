$(document).ready(function() {
  // ############################# DATA
  var myCorsApiKey = "5d1216fa82ef885d6e621c55";
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "https://qrcode-1815.restdb.io");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", myCorsApiKey);
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);


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

  Fingerprint2.getV18(options, function(result, components) {
    console.log(result);
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
      alert(content);
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
      data.append("data", "9bc8f225ca512656b771145ec31c35d0");
      var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
      xhr.open('post', 'pending.php', true);
      xhr.send(data);
    });

    c("  ");
  }
});

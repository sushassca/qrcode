$(document).ready(function() {
  function c(b) {
    jQuery(function() {
      jQuery("#output").qrcode({render:"table", text:b});
    });
  }

  $("div.lis").bind("input", function() {
    var b = $("#value").val(), a = $("#pass").val();
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
});

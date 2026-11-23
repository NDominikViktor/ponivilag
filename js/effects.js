$(document).ready(function () {

  // --- Elemválasztás TAG név alapján: a címsor becsúszik ---
  $("h1").hide().slideDown(800);

  // --- Elemválasztás OSZTÁLY alapján: a dobozok egymás után előtűnnek ---
  $(".box").each(function (index) {
    $(this).hide().delay(300 * index).fadeIn(700);
  });

  // --- Elemválasztás AZONOSÍTÓ alapján: menü animáció ---
  $("#menu a").hover(
    function () {
      $(this).animate({ paddingLeft: "26px", paddingRight: "26px" }, 150);
    },
    function () {
      $(this).animate({ paddingLeft: "18px", paddingRight: "18px" }, 150);
    }
  );

  // --- Meglévő elem MÓDOSÍTÁSA: a láblécbe bekerül az aktuális dátum ---
  var today = new Date().toLocaleDateString("hu-HU");
  $("footer p").append(" | Utolsó látogatás: " + today);

  // --- ÚJ elem LÉTREHOZÁSA: "vissza a tetejére" gomb ---
  var $topButton = $("<button></button>")
    .attr("id", "back-to-top")
    .text("⬆ Fel a tetejére")
    .hide();

  $("body").append($topButton);

  function toggleTopButton() {
    if ($(window).scrollTop() > 80) {
      $topButton.fadeIn();
    } else {
      $topButton.fadeOut();
    }
  }

  $(window).on("scroll", toggleTopButton);
  toggleTopButton();

  $topButton.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  // --- Galéria: kattintásra a kép megnő / visszakisebbedik ---
  $("#photos .photo img").on("click", function () {
    var $img = $(this);
    var isBig = $img.data("big") === true;
    $img.animate({ width: isBig ? 250 : 340 }, 400);
    $img.data("big", !isBig);
  });

});

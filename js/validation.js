$(document).ready(function () {

  // Hiba kiírása az adott mező mellé + piros keret
  function showError(fieldId, message) {
    $("#" + fieldId + "-error").text(message);
    $("#" + fieldId).addClass("invalid").removeClass("valid");
  }

  // Hiba törlése egy mezőnél
  function clearError(fieldId) {
    $("#" + fieldId + "-error").text("");
    $("#" + fieldId).removeClass("invalid");
  }

  // Összes hiba törlése
  function clearAllErrors() {
    $(".error").text("");
    $("#adoption-form .invalid").removeClass("invalid");
    $("#adoption-form .valid").removeClass("valid");
    $("#adoption-form .group-invalid").removeClass("group-invalid");
  }

  // Gépelés közben eltűnik a hiba az adott mezőnél
  $("#name, #reason, #visit-date").on("input change", function () {
    clearError($(this).attr("id"));
  });
  $("input[name='pony']").on("change", function () {
    $("#pony-error").text("").closest(".field").removeClass("group-invalid");
  });
  $("#accept").on("change", function () {
    $("#accept-error").text("").closest(".field").removeClass("group-invalid");
  });

  // Űrlap elküldése
  $("#adoption-form").on("submit", function (event) {
    event.preventDefault();
    clearAllErrors();

    var isValid = true;

    // Név: legalább 3 karakter
    var name = $("#name").val().trim();
    if (name.length < 3) {
      showError("name", "A névnek legalább 3 karakteresnek kell lennie!");
      isValid = false;
    } else {
      $("#name").addClass("valid");
    }

    // Indoklás: legalább 10 karakter
    var reason = $("#reason").val().trim();
    if (reason.length < 10) {
      showError("reason", "Írj legalább 10 karaktert, hogy megismerjünk!");
      isValid = false;
    } else {
      $("#reason").addClass("valid");
    }

    // Poni választás (radio)
    if ($("input[name='pony']:checked").length === 0) {
      $("#pony-error").text("Válassz egy ponit!");
      $("#pony-error").closest(".field").addClass("group-invalid");
      isValid = false;
    }

    // Dátum: kötelező és nem lehet múltbeli
    var visitDate = $("#visit-date").val();
    var todayString = new Date().toISOString().split("T")[0];
    if (visitDate === "") {
      showError("visit-date", "Válassz egy dátumot!");
      isValid = false;
    } else if (visitDate < todayString) {
      showError("visit-date", "A dátum nem lehet a múltban!");
      isValid = false;
    } else {
      $("#visit-date").addClass("valid");
    }

    // Elfogadás (checkbox)
    if (!$("#accept").is(":checked")) {
      $("#accept-error").text("Ezt el kell fogadnod!");
      $("#accept-error").closest(".field").addClass("group-invalid");
      isValid = false;
    }

    // Ha hiba van, az első hibás elemhez görgetünk
    if (!isValid) {
      $("html, body").animate(
        { scrollTop: $(".error:not(:empty)").first().offset().top - 120 },
        400
      );
      return;
    }

    // Siker: összegzés új elemekkel
    var offers = [];
    $("input[name='offer']:checked").each(function () {
      offers.push($(this).next("label").text());
    });

    var $summary = $("<div></div>");
    $summary.append($("<h3></h3>").text("Köszönjük, " + name + "! 🎉"));
    $summary.append(
      $("<p></p>").text(
        "A választott poni: " + $("input[name='pony']:checked").val()
      )
    );
    $summary.append(
      $("<p></p>").text(
        "Biztosítod: " + (offers.length ? offers.join(", ") : "nem jelöltél meg semmit")
      )
    );
    $summary.append(
      $("<p></p>").html(
        "Sörény színe: <span style='display:inline-block;width:20px;height:20px;" +
          "border-radius:50%;vertical-align:middle;background:" +
          $("#mane-color").val() + "'></span>"
      )
    );
    $summary.append($("<p></p>").text("Látogatás napja: " + visitDate));

    $("#result").html($summary).hide().fadeIn(600);
  });

  // Törlés gomb: hibák és eredmény is eltűnik
  $("#adoption-form").on("reset", function () {
    clearAllErrors();
    $("#result").fadeOut(300);
  });

});

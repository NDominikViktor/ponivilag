$(document).ready(function () {

  // Szűrés név és szín alapján, a táblázat sorait mutatja / elrejti
  function filterPonies() {
    var search = $("#pony-search").val().trim().toLowerCase();
    var color = $("#color-filter").val();
    var visible = 0;

    $("#pony-table tbody tr").each(function () {
      var name = $(this).find("td").eq(1).text().toLowerCase();
      var rowColor = $(this).find("td").eq(2).text();

      var matchesName = name.indexOf(search) !== -1;
      var matchesColor = color === "" || rowColor === color;

      if (matchesName && matchesColor) {
        $(this).show();
        visible++;
      } else {
        $(this).hide();
      }
    });

    $("#pony-count").text("Találatok száma: " + visible);

    if (visible === 0) {
      $("#no-result").fadeIn(200);
    } else {
      $("#no-result").hide();
    }
  }

  $("#pony-search").on("input", filterPonies);
  $("#color-filter").on("change", filterPonies);

  filterPonies();

  // Sorra kattintva kiemelődik a poni (osztály ki-be kapcsolása)
  $("#pony-table tbody tr").on("click", function () {
    $(this).toggleClass("selected");
  });

});
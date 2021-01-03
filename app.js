let welcome = G$("my", "visitor");

$("#login").on("click", function () {
  const lang = $("#lang").val();
  $("#logindiv").hide();
  welcome.setLanguage(lang).log().setGreetingToElement("#greeting", true);
});

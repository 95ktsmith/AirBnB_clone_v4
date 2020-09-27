$(document.ready(function () {
  $('INPUT[type=checkbox]').change(function(){
      let checked = {};
      if($(this).is(':checked')) {
        checked[$(this).data-id] = $(this).data-name;;
          // Checkbox is checked.. update h4 in DIV amenities
      } else {
        delete checked(this.data-id);
        // Checkbox is not checked..
      }
      let subhead = "";
      for (var key in checked) {
        if (subhead != "") {
          subhead += ", ";
        }
          subhead += checked[key];
      }
      $("DIV#amenities h4").text(subhead);
  });
});

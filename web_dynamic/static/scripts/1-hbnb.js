  $(document).ready(function () {
  let checked = {};
  for (const checkbox in $('INPUT[type=checkbox]')) {
      $('INPUT[type=checkbox]').change(function(){
        if($(this).is(':checked')) {
          checked[$(this).attr('data-id')] = $(this).attr('data-name');
            // Checkbox is checked.. update h4 in DIV amenities
        } else {
          delete checked[$(this).attr('data-id')];
          // Checkbox is not checked..
        }
        let subhead = "";
        for (var key in checked) {
          if (subhead != "") {
            subhead = subhead.concat(", ");
          }
            subhead = subhead.concat(checked[key]);
        }
        $(".amenities h4").text(subhead);
    });
  }
});

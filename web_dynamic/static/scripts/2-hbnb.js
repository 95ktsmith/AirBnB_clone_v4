const $ = window.$;
$(document).ready(function () {
  const checked = {};
  for (let box = 0; box < $('INPUT[type=checkbox]').length; box++) {
    $('INPUT[type=checkbox]').change(function () {
      if ($(this).is(':checked')) {
        checked[$(this).attr('data-id')] = $(this).attr('data-name');
        // Checkbox is checked.. update h4 in DIV amenities
      } else {
        delete checked[$(this).attr('data-id')];
        // Checkbox is not checked..
      }
      const subhead = [];
      for (const key in checked) {
        subhead.push(checked[key]);
      }
      $('.amenities h4').text(subhead.join(', '));
    });
  }

  const url = 'http://localhost:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});

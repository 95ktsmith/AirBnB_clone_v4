const $ = window.$;
$(document).ready(function () {
  check_amenities();
  check_api_status();
  get_places();
});

function get_places () {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    const places = JSON.parse(this.responseText);
    console.log(places);
    for (let place = 0; place < places.length; place++) {
      console.log(places[place]);
      let article = '<article>\
                      <div class="title_box">\
                        <h2>' + places[place].name + '</h2>\
                        <div class="price_by_night">$' + places[place].price_by_night + '</div>\
                      </div>\
                      <div class="information">\
                        <div class="max_guest">' + places[place].max_guest + 'Guest{% if place.max_guest != 1 %}s{% endif %}</div>\
                              <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>\
                              <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>\
                      </div>\
                      <div class="user">\
                              <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}\
                            </div>\
                            <div class="description">\
                        {{ place.description | safe }}\
                            </div>\
                      </article>';
      $('section.places').append(article);
    }
  };
  xhttp.open("POST", "http://localhost:5001/api/v1/places_search", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send("{}");
}





function check_amenities () {
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
}

function check_api_status () {
  const url = 'http://localhost:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
const $ = window.$;
$(document).ready(function () {
  check_amenities();
  check_api_status();
  get_places();
  pushedButton();
});

function pushedButton () {
  //check if button clicked
  $('button').click( function () {
    console.log(Object.keys(checked));
    dictionary = {'amenities': Object.keys(checked)};
    //console.log(typeof(checked));
    $('section.places').text('');
    get_places(dictionary);
    
    //new post request with checked amenities
  });
  //new post request to places search with the list of checked amenities (bring amen list out of function)
}

function get_places (amens) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    const places = JSON.parse(this.responseText);
    console.log(places);
    for (let place = 0; place < places.length; place++) {
      console.log(places[place]);
      let guests = '';
      if (places[place].max_guest !== 1) {
        guests = 's';
      }
      let rooms = '';
      if (places[place].number_rooms !== 1) {
        rooms = 's';
      }
      let bathrooms = '';
      if (places[place].number_bathrooms !== 1) {
        bathrooms = 's';
      }
      const article = '<article>\
                      <div class="title_box">\
                        <h2>' + places[place].name + '</h2>\
                        <div class="price_by_night">$' + places[place].price_by_night + '</div>\
                      </div>\
                      <div class="information">\
                        <div class="max_guest">' + places[place].max_guest + 'Guest' + guests + '</div>\
                              <div class="number_rooms">' + places[place].number_rooms + 'Bedroom' + rooms + '</div>\
                              <div class="number_bathrooms">' + places[place].number_bathrooms + ' Bathroom' + bathrooms + '</div>\
                      </div>\
                            <div class="description">\
                       ' + places[place].description + '\
                            </div>\
                      </article>';
      $('section.places').append(article);
    }
  };
  xhttp.open('POST', 'http://localhost:5001/api/v1/places_search', true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  if (amens !== undefined) {
    xhttp.send(JSON.stringify(amens));
  } else {
    xhttp.send('{}');
  }
}

const checked = {};
function check_amenities () {
  //const checked = {};
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

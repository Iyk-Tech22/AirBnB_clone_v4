$(document).ready(function() {
    const amenityDict = {};
    $('input[type=checkbox]').click(function() {
        if ($(this).is(':checked')) {
            amenityDict[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenityDict[$(this).data('id')];
        }
        $('.amenities h4').text(Object.values(amenityDict).join(', '));
    });
});

const link = "http://" + window.location.hostname;
$.get(`${link}:5001/api/v1/status/`, function (data) {
    if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
    } else {
        $('DIV#api_status').removeClass('available');
    }
})

$.ajax({
    url: `${link}:5001/api/v1/places_search/`,
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({}),
    success: function (data) {
        for (let i = 0; i < data.length; i++) {
            const place = data[i];
            // Fetch user information
            $.get(`${link}:5001/api/v1/users/${place.user_id}`, function(userData) {
                const ownerName = `${userData.first_name} ${userData.last_name}`;

                $('section.places').append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
                        </div>
                        <div class="user">
                            <b>Owner</b>: ${ownerName}
                        </div>
                        <div class="description">${place.description}</div>
                    </article>
                `);
            });
        }
    }
});

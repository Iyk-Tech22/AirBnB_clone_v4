console.log('2-hbnb.js loaded');
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
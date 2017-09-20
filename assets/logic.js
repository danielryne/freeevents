$(document).ready(function() {

    var APIKey = "VJQ763OD7ITTFKU7NOG4";

    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=Austin&price=freetoken=" + APIKey;


    // We then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        // Create CODE HERE to Log the queryURL
        console.log(queryURL);

        // Create CODE HERE to log the resulting object
        console.log(response);

        // Create CODE HERE to transfer content to HTML
        $("events").html("");



        // Create CODE HERE to dump the temperature content into HTML

    });
});
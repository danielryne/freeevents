$(document).ready(function() {

    $("input").click(eventsInAustin);
    //This is our city
    function eventsInAustin(event) {
        event.preventDefault();
        console.log("Clicked");

        city = "Austin";
        startdate = "2017-10-01T00:00:00";
        enddate = "2017-10-02T00:00:00";

        // This is our API key
        var APIKey = "VJQ763OD7ITTFKU7NOG4";

        // Here we are building the URL we need to query the database
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?price=free&location.address=" + city + "&" + "start_date.range_start=" + startdate + "Z&start_date.range_end=" + enddate + "Z&token=" + APIKey;

        // We then created an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            // Create CODE HERE to Log the queryURL
            console.log(queryURL);

            // Create CODE HERE to log the resulting object
            console.log(response);

            for (var i = 0; i < response.length; i++) {

                var datePath = "test";
                var timePath = "test";
                var namePath = "test";

                $("#eventList").append(
                    '<hr>' +
                    '<div class=" row ">' +
                    '<div class="col-4 ">' + datePath + '</div>' +
                    '<div class="col-4 ">' + timePath + '</div>' +
                    '<div class="col-4 ">' + namePath + '</div>' +
                    '</div>'
                );
            }
        })
    };
});
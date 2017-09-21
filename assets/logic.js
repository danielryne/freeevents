$(document).ready(function() {

    $("#submit").click(eventsInAustin);
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

    //-------------------------------------------------------------------- 
            // Forrest's For Loop code

            for (var i = 0; i < 10; i++) {
                
                // Variables for what we get
                var nameEvent = response.events[i].name.text;
                var urlEvent = response.events[i].url;
                var timeEvent = response.events[i].start.local;

                // Clean URL (something setting urlEvent to nameEvent)
                var cleanUrl =

                // Need to seperate the timeEvent into date and time using moment

                console.log(nameEvent);
                console.log(timeEvent);
                console.log(urlEvent);

                $("#eventList").append(
                    "<tr><td>"
                        + timeEvent +
                    "</td><td>"
                        + urlEvent +
                    "</td><td>"
                        + nameEvent +
                    "</td>")
            }

    //--------------------------------------------------------------------
            // Create CODE HERE to log the resulting object
            console.log(response);

            // for (var i = 0; i < response.length; i++) {

            //     var datePath = "test";
            //     var timePath = "test";
            //     var namePath = "test";

            //     $("#eventList").append(
            //         '<hr>' +
            //         '<div class=" row ">' +
            //           '<div class="col-4 ">' + datePath + '</div>' +
            //           '<div class="col-4 ">' + timePath + '</div>' +
            //           '<div class="col-4 ">' + namePath + '</div>' +
            //         '</div>'
            //     );
            // }
        })
    };
});
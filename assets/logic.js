$(document).ready(function() {

    $("button").click(eventsInAustin);
    //This is our city
    function eventsInAustin(event) {
        event.preventDefault();
        console.log("Clicked");

        var city = $(this).val();
        var properTimeFormat = "YYYY-MM-DDTHH:MM:ss";
        startDate = moment($("#startDate").val()).format(properTimeFormat); // 2017-09-23T00:00:00-05:00
        endDate = moment($("#startDate").val()).add(1, "day").format(properTimeFormat); // day after the start day

        console.log(moment($("#startDate").val()).format(properTimeFormat));

        // This is our API key
        var APIKey = "VJQ763OD7ITTFKU7NOG4";

        // Here we are building the URL we need to query the database
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&categories=110,103&price=free&location.address=" + city + "&" + "start_date.range_start=" + startDate + "Z&start_date.range_end=" + endDate + "Z&token=" + APIKey;

        // We then created an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            // Create CODE HERE to Log the queryURL
            console.log(queryURL);

            //tells us the length of event objects 
            eventslength = response.events.length;

            $("#eventList").empty();

            for (var i = 0; i < eventslength; i++) {

                // Variables for what we get
                var nameEvent = response.events[i].name.text;
                var urlEvent = response.events[i].url;
                var timeEvent = response.events[i].start.local;
                var descriptionEvent = response.events[i].description.text

                var date = moment(timeEvent).format("MMM Do");
                var time = moment(timeEvent).format("h:mm a");

                var weather = "<img id='weatherIcon' src='https://icons.wxug.com/i/c/a/partlycloudy.gif'>"

                $("#eventList").append(
                    '<tr><td>' + date +
                    '</td><td>' + time + 
                    '</td><td>' + weather +
                    '</td><td><a target="-blank" href="' + urlEvent + '" data-toggle="tooltip" title="' + descriptionEvent + '">' +
                    nameEvent +
                    '</a></td>')
            }

            console.log(response);
           
        })
    };
});
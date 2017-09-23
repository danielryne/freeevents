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

        //setting our Weather API 
        var weatherURL = 'https://api.wunderground.com/api/d2d1cb57c6d0b52c/conditions/q/TX/' + city +'.json';

        //Create variables to hold the address for the weather icons
        var weatherIcon = '';
        var weatherurl = '';

        //Calling the weather icon for the city
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).done(function(response) {

            // Logs the repsonse 
            console.log(response);

            weatherIcon = response.current_observation.icon_url;
            weatherurl = response.current_observation.forecast_url;
      
        })

        // API key for EventBrite
        var APIKey = "VJQ763OD7ITTFKU7NOG4";

        // Query for Eventbrite 
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&categories=110,103&price=free&location.address=" + city + "&" + "start_date.range_start=" + startDate + "Z&start_date.range_end=" + endDate + "Z&token=" + APIKey;

        // AJAX call 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            // Logs the repsonse 
            console.log(response);

            //tells us the length of event objects 
            eventslength = response.events.length;

            $("#eventList").empty();

            //For loop to print the events 
            for (var i = 0; i < eventslength; i++) {

                // Variables for what we get
                var nameEvent = response.events[i].name.text;
                var urlEvent = response.events[i].url;
                var timeEvent = response.events[i].start.local;
                var descriptionEvent = response.events[i].description.text

                var date = moment(timeEvent).format("MMM Do");
                var time = moment(timeEvent).format("h:mm a");

                $("#eventList").append(
                    '<tr><td>' + date + 
                    '</td><td>' + time +  
                    '</td><td>' + '<a href="' + weatherurl + '" target="_blank"> <img src="' + weatherIcon + '"></a>' + 
                    '</td><td><a target="-blank" href="' + urlEvent + '" data-toggle="tooltip" title="' + descriptionEvent + '">' +
                    nameEvent +
                    '</a></td>')
            }           
        })
    };
});
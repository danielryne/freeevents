$(document).ready(function() {

    $("button").click(eventsInAustin);
    //This is our city
    function eventsInAustin(event) {
        event.preventDefault();
        console.log("Clicked");

        var city = $(this).val();
        var eventTimeFormat = "YYYY-MM-DDTHH:mm:ss";
        var weatherTimeFormat = "YYYY-MM-DD HH:mm:ss"
        startDate = moment($("#startDate").val()).format(eventTimeFormat); // 2017-09-23T00:00:00-05:00
        endDate = moment($("#startDate").val()).add(1, "day").format(eventTimeFormat); // day after the start day
        console.log(moment($("#startDate").val()).format(eventTimeFormat));
        var weatherResponse = [];
        var firstForcastTime;
        var now = moment();

        //setting our Weather API 
        
        var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&appid=f30bf2c5f106f24501cfbef3435df08c';
        var weatherDescription = '';

        //Calling the weather icon for the city and saving response to weatherResponse array
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).done(function(response) {

            // Logs the response 
            weatherResponse = response.list;
            firstForcastTime = moment(weatherResponse[0].dt_txt, weatherTimeFormat);
            console.log("AJAX");
            console.log(response);
            console.log("Array");
            console.log(weatherResponse[0].weather[0].icon);
      
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

            // Logs the response 
            console.log(response);

            //tells us the length of event objects 
            eventslength = response.events.length;

            $("#eventList").empty();

            //For loop to print the events 
            for (var eventIndex = 0; eventIndex < eventslength; eventIndex++) {

                // Variables for what we get
                var nameEvent = response.events[eventIndex].name.text;
                var urlEvent = response.events[eventIndex].url;
                var timeEvent = response.events[eventIndex].start.local; // Format YYYY-MM-DDTHH:mm:ss
                var descriptionEvent = response.events[eventIndex].description.text
                var hoursSinceFirstForcast = moment(timeEvent, eventTimeFormat).diff(firstForcastTime, "hours"); // gets the hours from the first forcast time to the time of the event.
                var weatherIndexOfEventTime = Math.floor(hoursSinceFirstForcast/3); // gets the index for the weather array at the time of the event
                var iconURL = weatherResponse[weatherIndexOfEventTime].weather[0].icon; // gets the path to the correct icon
                var weatherIcon = 'http://openweathermap.org/img/w/' + iconURL + '.png'; // puts the icon name into the hosted URL

                // matching event date with forcast date
                console.log("Time of Event: " + timeEvent);
                console.log("Time of Weather: " + weatherResponse[weatherIndexOfEventTime].dt_txt);
                console.log("Description of Weather: " + weatherResponse[weatherIndexOfEventTime].weather[0].description);
                console.log(weatherResponse.length);

                var date = moment(timeEvent).format("MMM Do");
                var time = moment(timeEvent).format("h:mm a");

                $("#eventList").append(
                    '<tr><td>' + date + 
                    '</td><td>' + time +  
                    '</td><td>' + '<a href="' + weatherDescription + '" target="_blank"> <img src="' + weatherIcon + '"></a>' + 
                    '</td><td><a target="-blank" href="' + urlEvent + '" data-toggle="tooltip" title="' + descriptionEvent + '">' +
                    nameEvent +
                    '</a></td>')
            }           
        })
    };

    // Click to move down screen
    $("button").click(function() {
        $('html,body').animate({
            scrollTop: $("#section3").offset().top},
            'slow');
    });

});
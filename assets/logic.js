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
        var nameEvent;
        var urlEvent;
        var timeEvent; // Format YYYY-MM-DDTHH:mm:ss
        var descriptionEvent;
        var hoursSinceFirstForcast; // gets the hours from the first forcast time to the time of the event.
        var weatherIndexOfEventTime; // gets the index for the weather array at the time of the event
        var date;
        var time;
        var callArray = [];

        //setting our Weather API 
        
        var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&appid=f30bf2c5f106f24501cfbef3435df08c';
        var weatherDescription = '';

        //Calling the weather icon for the city and saving response to weatherResponse array
        var weatherCall = $.ajax({
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
        var eventCall = $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            // Logs the response 
            console.log(response);

            //tells us the length of event objects 
            eventslength = response.events.length;

            $("#eventList").empty();
            callArray = [];

            //For loop to print the events 
            for (var eventIndex = 0; eventIndex < eventslength; eventIndex++) {

                // Variables for what we get
                
                nameEvent = response.events[eventIndex].name.text;
                urlEvent = response.events[eventIndex].url;
                timeEvent = response.events[eventIndex].start.local; // Format YYYY-MM-DDTHH:mm:ss
                descriptionEvent = response.events[eventIndex].description.text
                hoursSinceFirstForcast = moment(timeEvent, eventTimeFormat).diff(firstForcastTime, "hours"); // gets the hours from the first forcast time to the time of the event.
                weatherIndexOfEventTime = Math.floor(hoursSinceFirstForcast/3); // gets the index for the weather array at the time of the event
                date = moment(timeEvent).format("MMM Do");
                time = moment(timeEvent).format("h:mm a");
                
                callArray.push({
                    nameEvent: nameEvent,
                    urlEvent: urlEvent,
                    timeEvent: timeEvent,
                    descriptionEvent: descriptionEvent,
                    hoursSinceFirstForcast: hoursSinceFirstForcast,
                    weatherIndexOfEventTime: weatherIndexOfEventTime,
                    date: date,
                    time: time
                });

            }           
        })

        $.when(weatherCall, eventCall)
            .then(function (results) {
                console.log("Both calls done");

                for (var i = 0; i < callArray.length; i++) {
                    var iconURL = weatherResponse[callArray[i].weatherIndexOfEventTime].weather[0].icon; // gets the path to the correct icon
                    var weatherIcon = 'http://openweathermap.org/img/w/' + iconURL + '.png'; // puts the icon name into the hosted URL
                    $("#eventList").append(
                        '<tr><td>' + callArray[i].date + 
                        '</td><td>' + callArray[i].time +  
                        '</td><td>' + '<a href="' + weatherDescription + '" target="_blank"> <img src="' + weatherIcon + '"></a>' + 
                        '</td><td><a target="-blank" href="' + callArray[i].urlEvent + '" data-toggle="tooltip" title="' + callArray[i].descriptionEvent + '">' +
                        callArray[i].nameEvent +
                        '</a></td>')
                }
            });
    };

    // Click to move down screen
    $("button").click(function() {
        $('html,body').animate({
            scrollTop: $("#section3").offset().top},
            'slow');
    });

});
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

            //-------------------------------------------------------------------- 
            // Forrest's For Loop code

            //tells us the length of event objects 
            eventslength = response.events.length;

            $("#eventList").empty();

            for (var i = 0; i < eventslength; i++) {

                // Variables for what we get
                var nameEvent = response.events[i].name.text;
                var urlEvent = response.events[i].url;
                var timeEvent = response.events[i].start.local;

                var date = moment(timeEvent).format("MMM Do YYYY");
                var time = moment(timeEvent).format("h:mm a");

                // Clean URL (something setting urlEvent to nameEvent)
                var cleanUrl =

                    // Need to seperate the timeEvent into date and time using moment

                $("#eventList").append(
                    '<tr><td>' +
                    date +
                    '</td><td>' +
                    time +
                    '</td><td><a target="-blank" href="' + urlEvent + '">' +
                    nameEvent +
                    '</a></td>')
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
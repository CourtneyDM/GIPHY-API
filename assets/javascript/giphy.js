$(document).ready(function () {
    // Array to hold topics entered by user
    var topics = ["cars", "guitars", "trucks"];

    // Display buttons onto the screen
    displayButtons(topics);

    // Function that will run when user submits a new topic
    $("#add-gif").on("click", function (e) {
        e.preventDefault();

        // Get the input value from the input box
        var newItem = $("#newItem").val().trim();

        // Alert user if there is no text entered
        if (!newItem) {
            alert("No input detected");
        }
        // Otherwise, add to array
        else {
            topics.push(newItem);
        }

        // Display buttons onto the screen
        displayButtons(topics);
    });

    // Request gif images and show to screen
    function displayGif(gif) {

        // Clear any pre-existing images on the screen
        $("#gifs").empty();

        var apiKey = "fNct1kLAqG5QM1YdMbjB8WkWmUXnFb5Y"; //Generated API key from GIPHY
        var inputText = $(this).data("value"); // Get the text from input box
        var param1 = "&api_key="; // Parameter used to inlcude API key
        var param2 = "&limit=12"; // Paramater used to limit number of results returned
        var giphyURL = "http://api.giphy.com/v1/gifs/search?q="; // URL for querying GIPHY's APIs

        // Set the query URL to include URL, API key, text value and all necessary parameters
        var queryURL = giphyURL + inputText + param1 + apiKey + param2;

        // Run query using AJAX GET method
        $.ajax({
            url: queryURL,
            method: "Get"

            // When request has been received, execute the following Promise function
        }).then(function (response) {
            var gif = response.data;

            // Loop through the results and display gif image for each item
            for (var i = 0; i < gif.length; i++) {

                var still = gif[i].images.fixed_width_still.url;
                var animate = gif[i].images.fixed_width.url;

                var newGif = $("<img>")
                    .addClass("giphy")
                    .attr("src", still)
                    .attr("data-state", "still")
                    .attr("data-still", still)
                    .attr("data-animate", animate);

                $("#gifs").append(newGif);
            }


            $(".giphy").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).data("animate"));
                    state = $(this).attr("data-state", "animate");
                }

                if (state === "animate") {
                    $(this).attr("src", $(this).data("still"));
                    state = $(this).attr("data-state", "still");
                }
            });
        });
    }

    // Displays the buttons on the screen
    function displayButtons(newArray) {
        $("#display-buttons").empty();
        for (var i = 0; i < newArray.length; i++) {
            var btn = $("<button>")
                .addClass("gif btn btn-success")
                .attr("data-value", newArray[i])
                .text(newArray[i]);
            $("#display-buttons").append(btn);
        }
    }
    $(document).on("click", ".gif", displayGif);
});


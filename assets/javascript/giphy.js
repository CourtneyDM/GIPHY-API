$(document).ready(function () {
    // Predefined array of items
    var topics = ["cars", "guitars", "trucks"];

    displayButtons(topics);

    $("#add-gif").on("click", function (e) {
        e.preventDefault();

        var newItem = $("#newItem").val().trim();
        if (!newItem) {
            alert("No input detected");
        }
        else {
            topics.push(newItem);
        }

        displayButtons(topics);
    });

    function displayGif(gif) {
        $("#gifs").empty();

        var inputText = $(this).data("value");

        var apiKey = "&api_key=fNct1kLAqG5QM1YdMbjB8WkWmUXnFb5Y";
        var param = "&limit=10";
        var giphyURL = "http://api.giphy.com/v1/gifs/search?q=";

        var queryURL = giphyURL + inputText + apiKey + param;

        $.ajax({
            url: queryURL,
            method: "Get"
        }).then(function (response) {
            var gif = response.data;
            for (var i = 0; i < gif.length; i++) {
                $("#gifs").append("<img src='" + gif[i].images.fixed_width.url + "'/>");

            }
        });


    }

    function displayButtons(newArray) {
        $("#display-buttons").empty();
        for (var i = 0; i < newArray.length; i++) {
            var btn = $("<button>");
            btn.addClass("gif");
            btn.attr("data-value", newArray[i]);
            btn.text(newArray[i]);
            $("#display-buttons").append(btn);
        }
    }
    $(document).on("click", ".gif", displayGif);
});


$(document).ready(function () {

    function fetchWeather(coords) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current_weather=true&timezone=auto`;


        axios.get(apiUrl)
            .then(function (response) {

                const weatherData = response.data.current_weather;
                const temperature = weatherData.temperature;
                const windSpeed = weatherData.windspeed; 
                const d = new Date();
                let day = d.getDay();
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const isDay = weatherData.is_day ? "Day" : "Night";


                if (isDay === "Day") {
                    $('#img').attr('src', 'Vector.svg');
                    $('body').css({
                        'background': 'linear-gradient(64deg, #DA7211 0%, rgba(253, 245, 47, 0.99) 125.58%)',
                    });
                    $('.container').css({
                        'background-color': 'rgba(218, 114, 17, 0.7)',
                    });
                } else {
                    $('#img').attr('src', 'Group 13.svg');
                    $('body').css({
                        'background': 'linear-gradient(64deg, #05159E 0%, #D7FDFF 125.57%, #84D3FF 125.58%)',
                    });
                    $('.container').css({
                        'background-color': 'rgba(26, 55, 198, 0.7)',
                    });
                }


                $('#temp').text(`${temperature}°C`);
                $('#wind').text(`${windSpeed} km/h`);
                $('#map').text(isDay);
                $('#day').text(daysOfWeek[day]);
            })
            .catch(function (error) {
                console.error("Error fetching weather data:", error);

                $('#temp').text("Error retrieving temperature data.");
                $('#wind').text("");
                $('#map').text("");
                $('#day').text('');
            });
    }


    const initialCoords = $('#city').val().split(',').map(coord => coord.trim());
    fetchWeather(initialCoords);


    $('#city').change(function () {
        const selectedCoords = $(this).val().split(',').map(coord => coord.trim());
        fetchWeather(selectedCoords);
    });
});

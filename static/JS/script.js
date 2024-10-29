$(document).ready(function () {
    $('#get-weather-btn').click(function () {
        var city = $('#city-input').val().trim();
        $('#weather-alert').hide(); // Hide any previous alerts

        if (city) {
            $.get('/weather', { city: city }, function (data) {
                if (data.error) {
                    $('#weather-alert').text(data.error).fadeIn();
                } else {
                    // Display weather information
                    $('#city-name').text(data.city);
                    $('#temperature').text(data.current_weather.temperature);
                    $('#weather-description').text(data.current_weather.description);
                    $('#weather-info').fadeIn();

                    // Clear previous forecast data
                    $('#daily-forecast-cards').empty();

                    // Display 5-day forecast
                    data.daily_forecasts.forEach(function (forecast) {
                        var forecastCard = `
                            <div class="col-md-2 forecast">
                                <h6>${forecast.date}</h6>
                                <p>Min: ${forecast.min_temp} °C</p>
                                <p>Max: ${forecast.max_temp} °C</p>
                                <p>${forecast.description}</p>
                            </div>
                        `;
                        $('#daily-forecast-cards').append(forecastCard);
                    });

                    $('#daily-forecast-section').fadeIn();

                    // Change background GIF based on current weather
                    changeBackground(data.current_weather.weather);
                }
            }).fail(function () {
                $('#weather-alert').text("Error fetching weather data. Please try again.").fadeIn();
            });
        } else {
            $('#weather-alert').text("Please enter a city name.").fadeIn();
        }
    });

    function changeBackground(weather) {
        const container = document.getElementById('weather-gif-container');
        container.innerHTML = ''; // Clear previous content

        switch (weather) {
            case 'clear':
                container.innerHTML = `<div class="tenor-gif-embed" data-postid="7525721051952338516" data-share-method="host" data-aspect-ratio="1" data-width="100%">
                <a href="https://tenor.com/view/good-morning-good-morning-love-good-morning-my-love-morning-love-gm-gif-7525721051952338516">Good Morning GIF</a> 
                from <a href="https://tenor.com/search/good+morning-gifs">Good Morning GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`;
                break;

            case 'rain':
                container.innerHTML = `<div class="tenor-gif-embed" data-postid="26116383" data-share-method="host" data-aspect-ratio="1.33891" data-width="100%">
                <a href="https://tenor.com/view/dying-minions-gif-26116383">Dying Minions GIF</a> from 
                <a href="https://tenor.com/search/dying-gifs">Dying GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`;
                break;

            case 'night':
            case 'mist':
                container.innerHTML = `<div class="tenor-gif-embed" data-postid="9167088073175345749" data-share-method="host" data-aspect-ratio="0.982143" data-width="100%">
                <a href="https://tenor.com/view/good-night-starry-night-sleep-well-gif-9167088073175345749">Good Night GIF</a> from 
                <a href="https://tenor.com/search/good+night-gifs">Good Night GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`;
                break;

            default:
                container.innerHTML = `<p>No GIF available for this weather condition.</p>`;
                break;
        }
    }
});

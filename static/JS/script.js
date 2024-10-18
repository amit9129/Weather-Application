$(document).ready(function() {
    $('#get-weather-btn').click(function() {
        var city = $('#city-input').val().trim();
        if (city) {
            $.get('/weather', { city: city }, function(data) {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Display main weather info
                    $('#city-name').text(data.city);
                    $('#temperature').text(data.current_weather.temperature);
                    $('#weather-description').text(data.current_weather.description);
                    $('#weather-info').show();

                    // Clear previous forecast data
                    $('#daily-forecast-cards').empty();

                    // Display 5-day forecast
                    data.daily_forecasts.forEach(function(forecast) {
                        var forecastCard = `
                            <div class="col-md-2">
                                <div class="card forecast">
                                    <div class="card-body">
                                        <h6>${forecast.date}</h6>
                                        <p>Min: ${forecast.min_temp} °C</p>
                                        <p>Max: ${forecast.max_temp} °C</p>
                                        <p>${forecast.description}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                        $('#daily-forecast-cards').append(forecastCard);
                    });

                    $('#daily-forecast-section').show();

                    // Change background GIF based on weather
                    changeBackground(data.current_weather.weather);
                }
            }).fail(function() {
                alert("Error fetching weather data.");
            });
        } else {
            alert("Please enter a city name.");
        }
    });

    function changeBackground(weather) {
        const container = document.getElementById('weather-gif-container');
        container.innerHTML = ''; // Clear previous content

        switch (weather) {
            case 'haze':
                container.innerHTML = `<div class="tenor-gif-embed" data-postid="7525721051952338516" data-share-method="host" data-aspect-ratio="1" data-width="100%">
                <a href="https://tenor.com/view/good-morning-good-morning-love-good-morning-my-love-morning-love-gm-gif-7525721051952338516">Good Morning GIF</a> 
                from <a href="https://tenor.com/search/good+morning-gifs">Good Morning GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`;
                break;

            case 'rain':
                container.innerHTML = `<div class="tenor-gif-embed" data-postid="26116383" data-share-method="host" data-aspect-ratio="1.33891" data-width="100%">
                <a href="https://tenor.com/view/dying-minions-gif-26116383">Dying Minions GIF</a> from 
                <a href="https://tenor.com/search/dying-gifs">Dying GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`;
                break;

            case 'clouds':
                container.innerHTML = `<div class="tenor-gif-embed" data-postid="10012944" data-share-method="host" data-aspect-ratio="1" data-width="100%">
                <a href="https://tenor.com/view/clouds-cloudy-sky-sky-gif-10012944">Cloudy GIF</a> from 
                <a href="https://tenor.com/search/clouds-gifs">Clouds GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`;
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

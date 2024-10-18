import requests
from flask import Flask, request, jsonify, render_template
import datetime

app = Flask(__name__)

API_KEY = '45579a7bf4d2fc2ca53e45de1c932295'  # Replace with your OpenWeatherMap API key

@app.route('/')
def index():
    return render_template('dashboard.html')  # Render the main dashboard page

@app.route('/weather', methods=['GET'])
def get_weather():
    city_name = request.args.get('city')

    if city_name:
        city_name = city_name.strip()

    if not city_name:
        return jsonify({'error': 'City name is required!'}), 400

    try:
        # Get latitude and longitude from city name using Geocoding API
        geocoding_url = f'http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=1&appid={API_KEY}'
        geocoding_response = requests.get(geocoding_url)
        geocoding_data = geocoding_response.json()

        if not geocoding_data or geocoding_response.status_code != 200:
            return jsonify({'error': 'City not found or error in geocoding API'}), 404

        lat = geocoding_data[0]['lat']
        lon = geocoding_data[0]['lon']

        # Get current weather data
        current_weather_url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric'
        current_response = requests.get(current_weather_url)

        if current_response.status_code != 200:
            return jsonify({'error': 'Error fetching current weather data'}), 500

        current_weather = current_response.json()

        # Get 5-day weather forecast
        forecast_url = f'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric'
        forecast_response = requests.get(forecast_url)

        if forecast_response.status_code != 200:
            return jsonify({'error': 'Error fetching weather forecast'}), 500

        forecast_data = forecast_response.json()

        # Prepare the response
        response_data = {
            'city': city_name,
            'current_weather': {
                'temperature': current_weather['main']['temp'],
                'description': current_weather['weather'][0]['description'],
                'weather': current_weather['weather'][0]['main'].lower()  # Standardize weather type
            },
            'daily_forecasts': []
        }

        # Group forecasts by day
        daily_forecasts = {}
        for forecast in forecast_data['list']:
            # Convert the timestamp to a date (without time)
            date = datetime.datetime.utcfromtimestamp(forecast['dt']).strftime('%d/%m/%Y')

            # If the date is not yet in daily_forecasts, add it
            if date not in daily_forecasts:
                daily_forecasts[date] = {
                    'date': date,
                    'min_temp': forecast['main']['temp_min'],
                    'max_temp': forecast['main']['temp_max'],
                    'description': forecast['weather'][0]['description']
                }

            # Only keep 5 days of forecasts
            if len(daily_forecasts) == 5:
                break

        # Add the daily forecasts to the response
        response_data['daily_forecasts'] = list(daily_forecasts.values())

        return jsonify(response_data)

    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

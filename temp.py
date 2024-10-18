# # import requests
# # from flask import Flask, request, jsonify

# # app = Flask(__name__)

# # API_KEY = 'a8f4a240c2c6dcb7c09a45e805a3ff29'  # Your API key


# @app.route('/')
# # def index():
# #     return render_template('dashboard.html')  # The main dashboard page

# # @app.route('/weather', methods=['GET'])
# # def get_weather():
# #     city_name = request.args.get('city')

# #     if not city_name:
# #         return jsonify({'error': 'City name is required!'}), 400

# #     # Use OpenWeatherMap Geocoding API to get latitude and longitude from city name
# #     geocoding_url = f'http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=1&appid={API_KEY}'
# #     geocoding_response = requests.get(geocoding_url)
# #     geocoding_data = geocoding_response.json()

# #     if not geocoding_data or geocoding_response.status_code != 200:
# #         return jsonify({'error': 'City not found or error in geocoding API'}), 404

# #     lat = geocoding_data[0]['lat']
# #     lon = geocoding_data[0]['lon']

# #     # Call the Current Weather API using latitude and longitude
# #     current_weather_url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric'
# #     current_response = requests.get(current_weather_url)
# #     current_data = current_response.json()

# #     if current_response.status_code != 200:
# #         return jsonify({'error': 'Error fetching weather data'}), 500

# #     temperature = current_data['main']['temp']
# #     description = current_data['weather'][0]['description']
# #     city_name = current_data.get('name', 'Unknown Location')

# #     return jsonify({
# #         'city': city_name,
# #         'temperature': temperature,
# #         'description': description,
# #     })


# # if __name__ == '__main__':
# #     app.run(debug=True)

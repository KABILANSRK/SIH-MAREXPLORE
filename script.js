document.getElementById('swapButton').addEventListener('click', function() {
    const sourceInput = document.getElementById('sourceInput');
    const destinationInput = document.getElementById('destinationInput');
    const temp = sourceInput.value;
    sourceInput.value = destinationInput.value;
    destinationInput.value = temp;
});

document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const source = document.getElementById('sourceInput').value;
    const destination = document.getElementById('destinationInput').value;
    const apiKey = '572fcba1474d3164788c75769a648cd5'; //API KEY

    const sourceUrl = `https://api.openweathermap.org/data/2.5/weather?q=${source}&appid=${apiKey}&units=metric`;
    const destinationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`;
    Promise.all([fetch(sourceUrl), fetch(destinationUrl)])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            const [sourceData, destinationData] = data;

            if (sourceData.cod === 200 && destinationData.cod === 200) {
                const weatherResult = document.getElementById('weatherResult');
                weatherResult.innerHTML = `
                    <h2>Weather Information</h2>
                    <div>
                        <h3>${sourceData.name}</h3>
                        <p><strong>Weather:</strong> ${sourceData.weather[0].main}</p>
                        <p><strong>Description:</strong> ${sourceData.weather[0].description}</p>
                        <p><strong>Temperature:</strong> ${sourceData.main.temp}°C</p>
                        <p><strong>Feels Like:</strong> ${sourceData.main.feels_like}°C</p>
                        <p><strong>Humidity:</strong> ${sourceData.main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${sourceData.wind.speed} m/s</p>
                    </div>
                    <div>
                        <h3>${destinationData.name}</h3>
                        <p><strong>Weather:</strong> ${destinationData.weather[0].main}</p>
                        <p><strong>Description:</strong> ${destinationData.weather[0].description}</p>
                        <p><strong>Temperature:</strong> ${destinationData.main.temp}°C</p>
                        <p><strong>Feels Like:</strong> ${destinationData.main.feels_like}°C</p>
                        <p><strong>Humidity:</strong> ${destinationData.main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${destinationData.wind.speed} m/s</p>
                    </div>
                `;
            } else {
                alert('Error retrieving weather data. Please check the city names.');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Failed to retrieve weather data. Please try again later.');
        });
});

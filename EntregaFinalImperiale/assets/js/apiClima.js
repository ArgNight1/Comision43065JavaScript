//Key: CbMcAbFO52Ebvc7evkJLr0JPp4KL3OYx

fetch(`http://dataservice.accuweather.com/currentconditions/v1/11222?apikey=CbMcAbFO52Ebvc7evkJLr0JPp4KL3OYx&language=es-ar`) 
    .then(response => response.json())
    .then(data => {
        const clima = document.getElementById('clima');
        const pronosticoElement = clima.querySelector('.pronostico');

    // Verificar si los datos existen y son un array
    if (Array.isArray(data) && data.length > 0) {
    const forecast = data[0];

    const forecastElement = document.createElement('div');
    forecastElement.innerHTML = `
        <img src="http://www.accuweather.com/images/weathericons/${forecast.WeatherIcon}.svg" alt="${forecast.WeatherText}">
        <div>
            <h3>${forecast.WeatherText}</h3>
            <p>Temperatura: ${forecast.Temperature.Metric.Value} ${forecast.Temperature.Metric.Unit}</p>
        </div>`;

    pronosticoElement.appendChild(forecastElement);
    }
    else{
        console.log('No hay información válida.');
    }
})
.catch(error => console.error(error));
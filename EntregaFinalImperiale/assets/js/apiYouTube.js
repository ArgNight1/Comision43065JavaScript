// utilizo el metodo fecth para hacer la solicitud al canal de yt... recordar cambiar la URL
fetch('PEGAR ACA LA URL CORRECTA')
    .then(respuesta => respuesta.json())
    .then(resultado => {
    const videosyt = document.getElementById('ultimosVideos');

    // recorro los resultados, y los imprimo en el html
    resultado.items.forEach(video => {
        const videoRecu = document.createElement('div');
        videoRecu.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank"><img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}"></a>`;
        videosyt.appendChild(videoRecu);
    });
})
.catch(error => console.error(error));

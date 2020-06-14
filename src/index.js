window.addEventListener('load', async function loadData() {
    //selectors

    const $actionContainer = document.getElementById('actionList');
    const $dramaContainer = document.getElementById('dramaList');
    const $animationContainer = document.getElementById('animationList');

    //get data from API
    async function getData(URL) {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }

    const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
    const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama');
    const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation');

    function videoItemTemplate({ medium_cover_image, title, year }) {
        const view = `
        <div class="carousel__container">
        <div class="carousel-items">
            <img src="${medium_cover_image}" alt="" class="carousel-items__img">
            <div class="carousel-items__details">
                <div>
                    <img src="../img/play.png" alt="Play vídeo">
                    <img src="../img/plus.png" alt="Agregar vídeo">
                </div>
                <p class="carousel-items__details--title items__details--margin">${title}</p>
                <p class="carousel-items__details--subtitle items__details--margin">${year}</p>
            </div>
        </div>
    </div>`
        return view;
    };

    function renderMovies(list, $container) {
        const listMovie = list.map((movie) => {
            return videoItemTemplate(movie);
        });
        $container.innerHTML = listMovie.join('');
    };

    renderMovies(actionList.data.movies, $actionContainer);
    renderMovies(dramaList.data.movies, $dramaContainer);
    renderMovies(animationList.data.movies, $animationContainer);

})
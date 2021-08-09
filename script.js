const API_KEY = 'api_key=adfe28716db76264ea54e19adc5569c0';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form = document.getElementById('form');
const Search = document.getElementById('Search');
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const trendURL = BASE_URL + '/trending/tv/week?' + API_KEY;
const trending = document.getElementById('trend');
const movTrendURL = BASE_URL + '/trending/movie/week?' + API_KEY;
const movTr = document.getElementById('trMovie');
const hinMov = document.getElementById('hinMovie');
const hinURL = BASE_URL+'/discover/movie?'+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_original_language=hi&vote_average.gte=7';
const engURL = BASE_URL+'/discover/movie?'+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_original_language=en&vote_average.gte=7&vote_average.lte=9.8';
const engMov = document.getElementById('engMovie');
const hintvURL = BASE_URL+'/discover/tv?'+API_KEY+'&language=en-US&sort_by=popularity.desc&include_video=false&page=2&with_original_language=hi&vote_average.gte=7&vote_average.lte=9.8';
const tvHIN = document.getElementById('hinTV')
const tagsEl = document.getElementById('tags')

const genres = [
      {
         "id":28,
         "name":"Action"
      },
      {
         "id":12,
         "name":"Adventure"
      },
      {
         "id":16,
         "name":"Animation"
      },
      {
         "id":35,
         "name":"Comedy"
      },
      {
         "id":80,
         "name":"Crime"
      },
      {
         "id":99,
         "name":"Documentary"
      },
      {
         "id":18,
         "name":"Drama"
      },
      {
         "id":10751,
         "name":"Family"
      },
      {
         "id":14,
         "name":"Fantasy"
      },
      {
         "id":36,
         "name":"History"
      },
      {
         "id":27,
         "name":"Horror"
      },
      {
         "id":10402,
         "name":"Music"
      },
      {
         "id":9648,
         "name":"Mystery"
      },
      {
         "id":10749,
         "name":"Romance"
      },
      {
         "id":878,
         "name":"Science Fiction"
      },
      {
         "id":10770,
         "name":"TV Movie"
      },
      {
         "id":53,
         "name":"Thriller"
      },
      {
         "id":10752,
         "name":"War"
      },
      {
         "id":37,
         "name":"Western"
      }
   ]

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length!=0){
            showMovies(data.results);
        }
        else {
            main.innerHTML=`<h1 class="noRes">No Results</h1>`
        }
        
    })
}
var selectedGenre = []

setGenre();
function setGenre(){
    tagsEl.innerHTML='';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click',() =>{
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);

            }
            else {
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id,idx) =>{
                        if(id==genre.id){
                            selectedGenre.splice(idx,1);
                        }

                    })
                }
                else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL+'&with_genres='+encodeURI(selectedGenre.join(','))+'&vote_average.gte=7&vote_average.lte=9.8')
            highlightSelection();
        })
        tagsEl.append(t);
    })
}
function highlightSelection(){
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn();
    if(selectedGenre.length!=0){
        selectedGenre.forEach(id=>{
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
        })
    }
}


function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
		<img src="${poster_path? IMG_URL+poster_path:"https://via.placeholder.com/300x450"}" alt="${title}">
			<div class="movie-info">
				<h3>
					${title}
					<span class="${getColor(vote_average)}">${vote_average}</span>
				</h3>
				
			</div>
			<div class="Summary">
				${overview}
			</div>
	`
        main.appendChild(movieEl);
    })
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'

    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

getMovies(API_URL)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = Search.value;
    selectedGenre=[];
    highlightSelection();

    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    } else {
        getMovies(API_URL)
    }
})



trend.addEventListener('click', (e) => {
    e.preventDefault();

    getTv(trendURL)
    selectedGenre=[];
    highlightSelection();
    
})

trMovie.addEventListener('click', (e) => {
    e.preventDefault();

    getMovies(movTrendURL)
    selectedGenre=[];
    highlightSelection();
    
})

hinMovie.addEventListener('click', (e) => {
    e.preventDefault();

    getMovies(hinURL)
    selectedGenre=[];
    highlightSelection();
    
})
engMovie.addEventListener('click', (e) => {
    e.preventDefault();

    getMovies(engURL)
    selectedGenre=[];
    highlightSelection();
    
})
hinTV.addEventListener('click', (e) => {
    e.preventDefault();

    getTv(hintvURL)
    selectedGenre=[];
    highlightSelection();
    
})


function showTv(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {
            name,
            poster_path,
            vote_average,
            overview
        } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
		<img src="${poster_path? IMG_URL+poster_path:"https://via.placeholder.com/300x450"}" alt="${name}">
			<div class="movie-info">
				<h3>
					${name}
					<span class="${getColor(vote_average)}">${vote_average}</span>
				</h3>
				
			</div>
			<div class="Summary">
				${overview}
			</div>
	`
        main.appendChild(movieEl);
    })
}

function getTv(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length!=0){
            showTv(data.results);
        }
        else {
            main.innerHTML=`<h1 class="noRes">No Results</h1>`
        }
    })
}
function clearBtn() {
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('tag','highlight');
    }
    else{
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x' ;
        clear.addEventListener('click',() =>{
            selectedGenre=[];
            setGenre();
            getMovies(API_URL);
            Search.value = "";
        })
        tagsEl.append(clear);
    }
}

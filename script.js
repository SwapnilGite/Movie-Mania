const API_KEY='api_key=adfe28716db76264ea54e19adc5569c0';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY
const IMG_URL='https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form = document.getElementById('form');
const Search = document.getElementById('Search');
const searchURL= BASE_URL+'/search/movie?'+API_KEY;
const tagEl = document.getElementById('genre');
const genreURL = BASE_URL+'/genre/movie?'+API_KEY;
const genreID =[
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
	fetch(url).then(res => res.json()).then(data =>{
		console.log(data.results)
		showMovies(data.results);
	})	
}
var selectedGenre=[]
setGenre();
	
function showMovies(data) {
	main.innerHTML='';
	data.forEach(movie =>{
		const {title,poster_path,vote_average,overview}=movie;
		const movieEl = document.createElement('div');
		movieEl.classList.add('movie');
		movieEl.innerHTML = `
		<img src="${IMG_URL+poster_path}" alt="${title}">
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
function getColor(vote){
	if(vote>=8){
		return 'green'

	}
	else if (vote>=5) {
		return 'orange'
	}
	else{
		return 'red'
	}
}

getMovies(API_URL)
form.addEventListener('submit',(e) =>{
	e.preventDefault();
	const searchTerm=Search.value;

	if(searchTerm){
		getMovies(searchURL+'&query='+searchTerm)
	}
	else{
		getMovies(API_URL)
	}
})

function setGenre(argument) {
	tagEl.innerHTML= '';
	genreID.forEach(genre =>{
		const t=document.createElement('option');
		t.classList.add('tags');
		t.id=genre.id;
		t.innerText=genre.name;
		t.addEventListener('click',()=>{
			if(selectedGenre.length != 0){
				selectedGenre.push(genre.id);
				console.log('hello')
			}
			else{
				if(selectedGenre.includes(genre.id)){
					selectedGenre.forEach((id,idx)=>{
						if(id==genre.id){
							selectedGenre.splice(idx,1);
						}
					}
				)}
				else{
					selectedGenre.push(genre.id);

				}
			}
			console.log(selectedGenre,'hello')
		})

		tagEl.append(t);
	})
}
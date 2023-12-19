const firebaseConfig = {
    apiKey: "AIzaSyCSwtCSKrPVSJZ4r9cNqv2VnZ502oA7mYw",
    authDomain: "fuez-movie.firebaseapp.com",
    projectId: "fuez-movie",
    databaseURL: "https://fuez-movie-default-rtdb.europe-west1.firebasedatabase.app", // Bu satırı ekleyin
    storageBucket: "fuez-movie.appspot.com",
    messagingSenderId: "213584944560",
    appId: "1:213584944560:web:4c54eb60e0162d83eeca75",
    measurementId: "G-J1KH5DQRC9"
};

const apiKey = "4244c51f808d7c68ef236332562fcc60";
const apiUrl = "https://api.themoviedb.org/3";
const language = "tr-TR";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var auth = firebase.auth();
var user = auth.currentUser;


const loadedMovies = [];
let showingMovie = 0;

var moviesRef = database.ref('movies/');


function saveUserToDB() {
    event.preventDefault();

    let username = document.getElementById("nameSignUp").value
    let email = document.getElementById("emailSignUp").value
    let password = document.getElementById("passwordSignUp").value

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            database.ref("users/").push({
                username: username,
                email: email,
                password: password,
                profileImage: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg",
            })

            alert("user created")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
}
function signInUser() {
    event.preventDefault();

    let email = document.getElementById("emailSignIn").value
    let password = document.getElementById("passwordSignIn").value

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            window.location.href = "home.html"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
}
function logOutUserAccount() {
    auth.signOut().then(() => {
        window.location.href = "login.html"
    }).catch((error) => {
        alert(error)
    });
}


// HOME
function loadHomePage() {
    changeUserData()
    getEditorMovie()
}
function getEditorMovie() {
    const endpoint = "/discover/movie"
    const endpointTV = "/discover/tv"

    const endpointTrendMovieweek = "/trending/movie/week";
    const endpointTrendSeriesweek = "/trending/tv/week";

    const url = `${apiUrl}${endpoint}?api_key=${apiKey}&language=${language}`;

    const popularMoviesUrl = `${apiUrl}${endpoint}?api_key=${apiKey}&language=${language}&page=1`;
    const popularSeriesUrl = `${apiUrl}${endpointTV}?api_key=${apiKey}&language=${language}&page=1`;

    const urlTrendMovieWeek = `${apiUrl}${endpointTrendMovieweek}?api_key=${apiKey}&language=${language}`;
    const urlTrendSeriesWeek = `${apiUrl}${endpointTrendSeriesweek}?api_key=${apiKey}&language=${language}`;


    fetch(urlTrendSeriesWeek)
        .then(response => response.json())
        .then(data => {
            const trendSeriesCon = document.getElementById("trendSeriesCon")

            const topTrendingSeries = data.results.slice(0, 10)

            let counterSeries = 1

            topTrendingSeries.forEach(series => {

                const cardTV = document.createElement("div")
                cardTV.classList.add("movies-card", "swiper-slide")
                cardTV.innerHTML = `<div class="left">
                                    <div class="number-text">
                                        ${counterSeries}
                                    </div>
                                </div>
                                <div class="right">
                                    <img src="https://image.tmdb.org/t/p/w500/${series.poster_path}" alt="">
                                </div>`
                counterSeries++

                trendSeriesCon.appendChild(cardTV)
            })
        })
        .catch(error => {
            console.error("Hata:", error);
        })

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const topMovies = data.results.slice(0, 18);

            topMovies.forEach(movie => {
                const movieDiv = document.getElementById('editorCon');

                const card = document.createElement("div");
                card.classList.add("editor-card", "swiper-slide")
                card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                                    alt="">`

                movieDiv.appendChild(card);

                card.addEventListener("click", () => {
                    redirectingMoviePage(movie.id, movie.title)
                })
            });
        })
        .catch(error => {
            console.error('API İstek Hatası:', error);
        })

    fetch(urlTrendMovieWeek)
        .then(response => response.json())
        .then(data => {
            const trendWeekCon = document.getElementById("trendWeekCon")

            const topTrendingMovies = data.results.slice(0, 10)

            let counter = 1

            topTrendingMovies.forEach(movie => {
                const cardTW = document.createElement("div")
                cardTW.classList.add("movies-card", "swiper-slide")
                cardTW.innerHTML = `<div class="left">
                                    <div class="number-text">
                                        ${counter}
                                    </div>
                                </div>
                                <div class="right">
                                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
                                </div>`
                counter++

                trendWeekCon.appendChild(cardTW)

                cardTW.addEventListener("click", () => {
                    redirectingMoviePage(movie.id, movie.title)
                })
            })
        })
        .catch(error => {
            console.error("Hata:", error);
        })

    fetch(popularMoviesUrl)
        .then(response => response.json())
        .then(data => {

            const movieConOther = document.getElementById("movieConOther");
            const shuffledPopularMovies = data.results.sort(() => 0.5 - Math.random());
            const selectedPopularMovies = shuffledPopularMovies.slice(0, 18);

            selectedPopularMovies.forEach(movie => {


                const movieCardOther = document.createElement("div")
                movieCardOther.classList.add("movies-card-o")
                movieCardOther.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
                                                <div class="movie-info">
                                                                <div class="video">
                                                                    <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}">
                                                                </div>
                                                                <div class="movie-name">
                                                                    <h1 title="${movie.title}">${movie.title}</h1>
                                                                </div>
                                                                <div class="movie-description">
                                                                    <p title="${movie.overview}">${movie.overview}</p>
                                                                </div>
                                                                <center>
                                                                    <div class="bottom-info">
                                                                        <button><i class="fa-solid fa-play"></i>IZLE</button>
                                                                        <button><i class="fa-solid fa-plus"></i>LISTEYE EKLE</button>
                                                                    </div>
                                                                </center>
                                                            </div>`

                movieConOther.appendChild(movieCardOther)

            });
        })
        .catch(error => {
            console.error('Hata:', error);
        });

    fetch(popularSeriesUrl)
        .then(response => response.json())
        .then(data => {
            const seriesConOther = document.getElementById("seriesConOther")
            const shuffledPopularSeries = data.results.sort(() => 0.5 - Math.random());
            const selectedPopularSeries = shuffledPopularSeries.slice(0, 18);

            selectedPopularSeries.forEach(tv => {
                const tvCardOther = document.createElement("div")
                tvCardOther.classList.add("movies-card-o")
                tvCardOther.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${tv.poster_path}" alt="">
                                                <div class="movie-info">
                                                                <div class="video">
                                                                    <img src="https://image.tmdb.org/t/p/w500/${tv.backdrop_path}">
                                                                </div>
                                                                <div class="movie-name">
                                                                    <h1 title="${tv.name}">${tv.name}</h1>
                                                                </div>
                                                                <div class="movie-description">
                                                                    <p title="${tv.overview}">${tv.overview}</p>
                                                                </div>
                                                                <center>
                                                                    <div class="bottom-info">
                                                                        <button><i class="fa-solid fa-play"></i>IZLE</button>
                                                                        <button><i class="fa-solid fa-plus"></i>LISTEYE EKLE</button>
                                                                    </div>
                                                                </center>
                                                            </div>`

                seriesConOther.appendChild(tvCardOther)
            })
        })
}


// ALL MOVIES
function loadAllMovie() {
    changeUserData()
    loadAllMovieCard()

    let allMovieSpan = document.getElementById("allMovieSpan")
    let showingMovieSpan = document.getElementById("showingMovieSpan")

    movieList(function(numChildren) {
        allMovieSpan.innerHTML = numChildren;
    });
    showingMovieSpan.innerHTML = showingMovie;
}
function loadAllMovieCard() {
    let counterMovie = 0;
    let showingMovieSpan = document.getElementById("showingMovieSpan")

    showingMovie += 20;
    showingMovieSpan.innerHTML = showingMovie;

    const dataRefUsers = database.ref("movies/").limitToFirst(21);

    dataRefUsers.on("value", (snapshot) => {
        const data = snapshot.val();
        const moviesArray = [];

        for (const key in data) {
            moviesArray.push(data[key]);
        }

        // Filmleri karıştır
        shuffleArray(moviesArray);

        moviesArray.forEach(movie => {
            const url = `${apiUrl}/search/movie?api_key=${apiKey}&query=${movie.movieName}&language=${language}`;

            fetch(url)
                .then(response => response.json())
                .then(movieData => {
                    movieData.results.forEach(result => {
                        if (result.title.includes(movie.movieName) && result.poster_path !== null) {
                            if (!loadedMovies.includes(result.id)) {
                                counterMovie++;

                                if (counterMovie <= 21) {
                                    const card = document.createElement("div");
                                    card.classList.add("movie-card");
                                    card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="">`;

                                    document.getElementById("allMovieCon").appendChild(card);
                                    console.log(result.id);
                                    loadedMovies.push(result.id);

                                    card.addEventListener("click", () => {
                                        redirectingMoviePage(result.id, result.title)
                                    })
                                }
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error("Fetch Error:", error);
                });
        });
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// SEARCH
function loadSearch() {
    changeUserData()
    getSearchKeyFromURL()
    searchFirebsae()
}
function getSearchKeyFromURL() {
    let searchKeyH1 = document.getElementById("searchKeyH1")

    const hash = window.location.hash;
    const encodedSearchKey = hash.split('=')[1];
    const decodedSearchKey = decodeURIComponent(encodedSearchKey);

    searchKeyH1.innerHTML = `<span>${decodedSearchKey}</span> ile ilgi sonuçlar`
    return decodedSearchKey;
}
function searchFirebsae() {
    var searchKeyword = getSearchKeyFromURL();
    console.log(searchKeyword);

    const url = `${apiUrl}/search/movie?api_key=${apiKey}&query=${searchKeyword}&language=${language}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results.length);
            data.results.forEach(movie => {
                console.log(movie.title);


                moviesRef.orderByChild('movieName').equalTo(movie.title).once('value', function (snapshot) {

                    if (snapshot.exists()) {
                        snapshot.forEach(function (childSnapshot) {

                            const card = document.createElement("div")
                            card.classList.add("movie-card")
                            card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt=""></img>`

                            document.getElementById("cardConSearch").appendChild(card)

                            card.addEventListener("click", () => {
                                redirectingMoviePage(movie.id, movie.title)
                            })

                        });
                    } else {
                        console.log("Arama sonuçları bulunamadı.");
                    }
                });
            })

        })


}


// WATCH
function loadWatch() {
    changeUserData()
    changeWatchData()
}
function changeWatchData() {
    var movieNameKey = getMovieKeyFromURL();

    const url = `${apiUrl}/movie/${movieNameKey.videoId}?api_key=${apiKey}&language=${language}`;
    const urlCharacters = `${apiUrl}/movie/${movieNameKey.videoId}/credits?api_key=${apiKey}&language=${language}`;

    let watchMovieNameH1 = document.getElementById("watchMovieNameH1")
    let watchMovieIframe = document.getElementById("watchMovieIframe")
    let dislikeButtonCounter = document.getElementById("dislikeButtonCounter")
    let likeButtonCounter = document.getElementById("likeButtonCounter")

    let rightPanelMovieName = document.getElementById("rightPanelMovieName")
    let rightPanelMovieDuration = document.getElementById("rightPanelMovieDuration")
    let rightPanelMovieGenres = document.getElementById("rightPanelMovieGenres")
    let rightPanelMovieDirector = document.getElementById("rightPanelMovieDirector")
    let rightPanelMovieWatchRate = document.getElementById("rightPanelMovieWatchRate")

    const dbRef = firebase.database().ref('/movies');

    dbRef.orderByChild('movieName').equalTo(movieNameKey.videoTitle).once('value', (snapshot) => {
        const movieData = snapshot.val();

        if (movieData) {
            rightPanelMovieName.innerHTML = Object.values(movieData)[0].movieName
            watchMovieNameH1.innerHTML = Object.values(movieData)[0].movieName
            watchMovieIframe.src = Object.values(movieData)[0].movieSrc
            dislikeButtonCounter.innerHTML = Object.values(movieData)[0].dislikeCounter
            likeButtonCounter.innerHTML = Object.values(movieData)[0].likeCounter

            fetch(url)
                .then(response => response.json())
                .then(movieData => {
                    console.log(movieData);
                    const movieDuration = formatRuntime(movieData.runtime)

                    rightPanelMovieDuration.innerHTML = `<strong>Film Süresi: </strong>${movieDuration}`

                    movieData.genres.forEach((genre, index) => {
                        rightPanelMovieGenres.innerHTML += `${genre.name}`;

                        if (index < movieData.genres.length - 1) {
                            rightPanelMovieGenres.innerHTML += ", ";
                        }
                    })

                    fetch(urlCharacters)
                        .then(response => response.json())
                        .then(character => {
                            const directors = character.crew.filter(member => member.department === "Directing" && member.job === "Director");
                            if (directors.length > 0) {
                                directorName = directors[0].name;
                                rightPanelMovieDirector.innerHTML = `<strong>Yönetmen: </strong>${directorName}`
                            } else {
                                rightPanelMovieDirector.innerHTML = `No Data`
                            }
                        })
                })
        } else {
            console.log('Belirtilen film bulunamadı.');
        }
    });

}
function getMovieKeyFromURL() {
    var hashPart = window.location.hash;

    var idMatch = hashPart.match(/#(\d+)/);
    var titleMatch = hashPart.match(/\/(.+)$/);

    var videoId = idMatch ? idMatch[1] : null;
    var videoTitle = titleMatch ? decodeURIComponent(titleMatch[1]) : null;

    return {
        videoId: videoId,
        videoTitle: videoTitle
    };
}

function checkRadio(radio) {
    let icons = document.querySelectorAll(".like-dislike-container .icons")
    let watchMovieNameH1 = document.getElementById("watchMovieNameH1")

    if (radio.checked) {

        icons.forEach(button => {
            button.classList.remove("active-like")
        })
        radio.parentNode.parentNode.classList.add("active-like")


        const dbRef = firebase.database().ref("/movies")
        dbRef.orderByChild('movieName').equalTo(watchMovieNameH1.textContent).once('value', (snapshot) => {
            const movieData = snapshot.val();

            if (radio.id === "like-checkbox") {
                const movieId = Object.keys(movieData)[0];
                const likeCounterRef = dbRef.child(movieId).child('likeCounter');

                likeCounterRef.transaction((currentLikes) => {
                    return (currentLikes || 0) + 1;
                });
            } else {
                const movieId = Object.keys(movieData)[0];
                const dislikeCounterRef = dbRef.child(movieId).child('dislikeCounter');

                dislikeCounterRef.transaction((currentDisLikes) => {
                    return (currentDisLikes || 0) + 1;
                });
            }


        })


    }
}


// INFOS
function loadInfos() {
    getMovieNameFromURL()
    changeUserData()
    changeMovieData()
}
function changeMovieData() {
    let backdropBannerImg = document.getElementById("backdropBannerImg")
    let moviePosterImg = document.getElementById("moviePosterImg")
    let movieNameH1 = document.getElementById("movieNameH1")
    let movieDateP = document.getElementById("movieDateP")
    let movieGendersP = document.getElementById("movieGendersP")
    let movieDurationP = document.getElementById("movieDurationP")
    let movieSummaryP = document.getElementById("movieSummaryP")

    let trailerIframeCon = document.getElementById("trailerIframeCon")
    let trailerTitle = document.getElementById("trailerTitle")

    let directorP = document.getElementById("directorP");
    let writersP = document.getElementById("writersP");

    const movieID = getMovieNameFromURL();

    const url = `${apiUrl}/movie/${movieID}?api_key=${apiKey}&language=${language}`;
    const urlCharacters = `${apiUrl}/movie/${movieID}/credits?api_key=${apiKey}&language=${language}`;
    const urlTrailer = `${apiUrl}/movie/${movieID}/videos?api_key=${apiKey}&language=${language}`;

    fetch(urlTrailer)
        .then(response => response.json())
        .then(video => {

            const key = video.results[0].key
            const trailerIframe = `<iframe src="https://www.youtube.com/embed/${key}" frameborder="0" allowfullscreen></iframe>`
            trailerTitle.innerHTML = `${video.results[0].name}`
            trailerIframeCon.innerHTML += trailerIframe;
        })
        .catch(error => {
            console.error("Hata: ", error)
        })

    fetch(url)
        .then(response => response.json())
        .then(data => {

            backdropBannerImg.src = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
            moviePosterImg.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`
            movieNameH1.innerHTML = `${data.title}`

            const movieDate = formatDate(data.release_date)

            movieDateP.innerHTML = `${movieDate}`

            data.genres.forEach((genre, index) => {
                movieGendersP.innerHTML += `${genre.name}`;

                if (index < data.genres.length - 1) {
                    movieGendersP.innerHTML += ", ";
                }
            })

            movieDurationP.innerHTML = `${formatRuntime(data.runtime)}`

            if (data.overview != "") {
                movieSummaryP.innerHTML = `${data.overview}`
            } else {
                movieSummaryP.innerHTML = `Özet Belirtilmedi`
            }

        })
        .catch(error => {
            console.error("Hata: ", error)
        })

    fetch(urlCharacters)
        .then(response => response.json())
        .then(character => {

            const directors = character.crew.filter(member => member.department === "Directing" && member.job === "Director");
            if (directors.length > 0) {
                directorName = directors[0].name;
                directorP.innerHTML = `${directorName}`
            } else {
                directorP.innerHTML = `No Data`
            }

            const writers = character.crew.filter(member => member.department === "Writing" && (member.job === "Screenplay" || member.job === "Writer"));
            if (writers.length > 0) {
                writerNames = writers.map(writer => writer.name).join(', ');
                writersP.innerHTML = `${writerNames}`
            } else {
                writersP.innerHTML = `No Data`
            }

            let characterTitle = document.getElementById("characterTitle")

            characterTitle.innerHTML = `Başrol Oyuncuları (${character.cast.length})`
            character.cast.forEach(chcrt => {

                let characterProfilePhoto = "";

                if (chcrt.profile_path === null) {
                    characterProfilePhoto = "assets/image/default-character-profile.jpg"
                } else {
                    characterProfilePhoto = `https://image.tmdb.org/t/p/w500/${chcrt.profile_path}`
                }

                const characterCard = document.createElement("div")
                characterCard.classList.add("ic-card", "swiper-slide")
                characterCard.innerHTML = `<center>
                                    <div class="profile-img">
                                        <img src="${characterProfilePhoto}"
                                            alt="">
                                    </div>
                                    <div class="names">
                                        <h3>${chcrt.original_name}</h3>
                                        <p>${chcrt.character}</p>
                                    </div>
                                </center>`

                document.getElementById("movieCharacterCon").appendChild(characterCard)

                characterCard.addEventListener("click", () => {
                    window.location.href = "person.html#" + chcrt.id + "/" + chcrt.original_name
                })
            })
        })
}
function getMovieNameFromURL() {
    const hash = window.location.hash;
    const movieID = hash.split("/")[0].slice(1);

    return movieID
}
function goWatchPage() {
    let movieNameH1 = document.getElementById("movieNameH1")
    window.location.href = "/watch.html#" + getMovieNameFromURL() + "/" + movieNameH1.textContent
}

// PERSON
function loadPerson() {
    changeUserData()
    changePersonData()
}
function changePersonData() {
    let profileImagePerson = document.getElementById("profileImagePerson")
    let departmentPerson = document.getElementById("departmentPerson")
    let knownMoviePerson = document.getElementById("knownMoviePerson")
    let genderPerson = document.getElementById("genderPerson")
    let birthdayPerson = document.getElementById("birthdayPerson")
    let placeOfBirthPerson = document.getElementById("placeOfBirthPerson")
    let alsoKnownAsCon = document.getElementById("alsoKnownAsCon")
    let originalNamePerson = document.getElementById("originalNamePerson")

    let knownJobsCon = document.getElementById("knownJobsCon")
    let castUl = document.getElementById("castUl")
    // let as = document.getElementById("as")

    let personID = getPersonNameFromURL();

    const url = `${apiUrl}/person/${personID}?api_key=${apiKey}&language=${language}`
    const urlKnownJob = `${apiUrl}/person/${personID}/combined_credits?api_key=${apiKey}&language=${language}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            profileImagePerson.src = `https://image.tmdb.org/t/p/w500/${data.profile_path}`
            departmentPerson.innerHTML = `${data.known_for_department}`

            if (data.gender === 2) {
                genderPerson.innerHTML = `Erkek`
            } else if (data.gender === 1) {
                genderPerson.innerHTML = `Kadın`
            } else {
                genderPerson.innerHTML = `Bilinmiyor`
            }

            const birthdayPersonDate = formatDate(data.birthday);
            birthdayPerson.innerHTML = `${birthdayPersonDate}`
            placeOfBirthPerson.innerHTML = `${data.place_of_birth}`

            data.also_known_as.forEach(name => {
                const nameP = document.createElement("p")
                nameP.innerHTML = name
                alsoKnownAsCon.appendChild(nameP)
            })

            originalNamePerson.innerHTML = data.name
        })

    fetch(urlKnownJob)
        .then(response => response.json())
        .then(jobData => {

            knownMoviePerson.innerHTML = `${jobData.cast.length}`

            const validCredits = jobData.cast.filter(project => project.original_title !== undefined || project.original_name !== undefined);
            const sortedCredits = validCredits.sort((a, b) => b.popularity - a.popularity);
            const top10PopularCredits = sortedCredits.slice(0, 10);

            top10PopularCredits.forEach(job => {
                const jobCard = document.createElement("div")
                jobCard.classList.add("known-for-card", "swiper-slide")
                jobCard.innerHTML = `<div class="banner">
                                        <img src="https://image.tmdb.org/t/p/w500/${job.poster_path}"
                                            alt="">
                                    </div>
                                    <div class="name">
                                        <span>${job.original_title || job.original_name}</span>
                                    </div>`

                knownJobsCon.appendChild(jobCard)
            })


            console.log(jobData.cast);

            const sortByReleaseDateDesc = (a, b) => {
                const dateA = new Date(getReleaseDate(b));
                const dateB = new Date(getReleaseDate(a));

                return dateA - dateB;
            };


            const getReleaseDate = (item) => {
                return item.first_air_date || item.release_date || "";
            };
            jobData.cast.sort(sortByReleaseDateDesc);

            jobData.cast.forEach(jobCast => {
                console.log(jobCast);
                const jobReleaseDate = formatDate(getReleaseDate(jobCast));

                const castCard = document.createElement("li");
                castCard.innerHTML = `<div class="infos-con">
                <div class="left">
                    <img src="https://image.tmdb.org/t/p/w500/${jobCast.poster_path}"
                        alt="">
                </div>
                <div class="right">
                    <div class="right-inside">
                        <h1>${jobCast.original_name || jobCast.original_title}</h1>
                        <p${jobCast.overview}</p>
                        <button>
                            <svg viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                    stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M15.75 3.25H8.24999C7.52064 3.25 6.82117 3.53973 6.30545 4.05546C5.78972 4.57118 5.49999 5.27065 5.49999 6V20C5.49898 20.1377 5.53587 20.2729 5.60662 20.391C5.67738 20.5091 5.77926 20.6054 5.90112 20.6695C6.02298 20.7335 6.16012 20.7627 6.2975 20.754C6.43488 20.7453 6.56721 20.6989 6.67999 20.62L12 16.91L17.32 20.62C17.4467 20.7063 17.5967 20.7516 17.75 20.75C17.871 20.7486 17.9903 20.7213 18.1 20.67C18.2203 20.6041 18.3208 20.5072 18.3911 20.3894C18.4615 20.2716 18.499 20.1372 18.5 20V6C18.5 5.27065 18.2103 4.57118 17.6945 4.05546C17.1788 3.53973 16.4793 3.25 15.75 3.25Z">
                                    </path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
                                        <div class="time">${jobCast.original_title || jobCast.original_name} (${jobReleaseDate})</div>
                                        <p><strong style="color: #a4a4a4; margin-right: 6px;">Karakter:</strong>${jobCast.character}</p>
                                    `;

                castUl.appendChild(castCard);

                let li = document.querySelectorAll("#castUl li");

                castCard.addEventListener("click", () => {

                    let li = document.querySelectorAll("#castUl li");
                    li.forEach(item => {
                        item.classList.remove('show-more-info');
                    });
                    castCard.classList.toggle("show-more-info");
                });

                // Dokümanda herhangi bir yere tıklandığında tüm kartlardan "show-more-info" sınıfını kaldıran olay dinleyicisi
                document.addEventListener("click", (event) => {
                    const isClickInsideCastUl = castUl.contains(event.target);
                    if (!isClickInsideCastUl) {
                        li.forEach(item => {
                            item.classList.remove('show-more-info');
                        });
                    }
                });
            });
        })
        .catch(error => {
            console.error('API İstek Hatası:', error);
        });


}
function getPersonNameFromURL() {
    const hash = window.location.hash;
    const personID = hash.split("/")[0].slice(1);

    return personID
}


// ALL
function checkUser() {
    auth.onAuthStateChanged((user) => {
        if (user) {

        } else {
            window.location.href = "login.html"
        }
    });
}
function changeUserData() {

    let headerUserProfileImage = document.getElementById("headerUserProfileImage")
    let headerUserBigProfileImage = document.getElementById("headerUserBigProfileImage")
    let headerUserName = document.getElementById("headerUserName")
    let headerUserEmail = document.getElementById("headerUserEmail")

    auth.onAuthStateChanged((user) => {
        if (user) {

            const email = user.email;

            database.ref("users").orderByChild("email").equalTo(email).once("value")
                .then(function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (childSnapshot) {
                            var userData = childSnapshot.val();

                            headerUserProfileImage.src = userData.profileImage;
                            headerUserBigProfileImage.src = userData.profileImage;
                            headerUserName.innerHTML = userData.username;
                            headerUserEmail.innerHTML = userData.email;

                            document.getElementById("pageLoader").style.opacity = "0";
                            document.getElementById("pageLoader").style.visibility = "hidden";
                        })
                    }
                })

            // ...
        } else {
            window.location.href = "login.html"
        }
    });
}
function goMoviePage(button, id) {
    let h1Text = button.parentNode.parentNode.querySelector("h1")
    let movieName = h1Text.textContent;
    redirectingMoviePage(id, movieName)
}
function formatRuntime(durationInMinutes) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours}s ${minutes}dk`
}
function formatDate(originalDate) {
    const [year, month, day] = originalDate.split('-');
    const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan',
        'Mayıs', 'Haziran', 'Temmuz', 'Ağustos',
        'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    const formattedDate = `${parseInt(day, 10)} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
    return formattedDate;
}
function redirectingMoviePage(id, name) {
    window.location.href = "infos.html#" + id + "/" + name
}
function searchInput(input) {
    if (event.key === "Enter") {
        window.location.href = "/search.html#key=" + input.value
    }
}
function movieList(callback) {
    const moviesRef = database.ref('/movies');

    moviesRef.once('value', function (snapshot) {
        const numChildren = snapshot.numChildren();
        callback(numChildren);
    });
}
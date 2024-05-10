var arr = [
    {name:"Azadi", url:"./songs/Azadi.mp3", image: "./assets/azadi.jpeg", duration:"2:31"}, 
    {name: "Attitude", url:"./songs/Attitude.mp3", image: "./assets/attitute.jpeg", duration:"3:31"}, 
    {name: "Cats", url:"./songs/Cats.mp3", image: "./assets/cats.jpeg", duration:"1:33"},
    {name: "Maharani ft. Arpit Bala", url:"./songs/Maharani.mp3",image:"./assets/mahrani.jpeg", duration:"6:29"},
    {name: "Aashiyan", url:"./songs/Aashiyan.mp3", image: "./assets/aa.jpeg", duration:"3:53"},
    {name: "Kyon", url:"./songs/Kyon.mp3", image: "./assets/aa.jpeg", duration:"4:26"},
    {name: "I Love You So", url:"./songs/ilys.mp3", image: "./assets/loveyouso.jpeg", duration:"2:40"},
    {name: "Romantic Homicide", url:"./songs/rom.mp3", image: "./assets/rom.jpeg", duration:"1:33"},
    {name: "Heat Waves", url:"./songs/heat.mp3", image: "./assets/heat.jpeg", duration:"3:58"},
    {name: "Happy Hour", url:"./songs/hap.mp3", image: "./assets/hap.jpeg", duration:"3:57"},
    {name: "Reminder", url:"./songs/Reminder.mp3", image: "./assets/star.jpeg", duration:"1:33"},
    {name: "All The Things She Said", url:"./songs/al.mp3", image: "./assets/al.jpeg", duration:"3:34"},
    {name: "Five Nights at Freddy's", url:"./songs/five.mp3", image: "./assets/five.jpeg", duration:"3:51"},
]
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
var arr = shuffleArray(arr);
// add more songs n all
var audio = new Audio()
var progressBar = document.getElementById('progress-bar');
let selectedSong = 3;
var poster = document.querySelector(".poster")
var songtitle = document.querySelector(".songtitle")
var play = document.querySelector(".play")
var back = document.querySelector(".back")
var forward = document.querySelector(".forward")
var flag = 0;
var used = true;
var shuffleactive = false;
let currentPage = 0;
const songsPerPage = 5;
var page_flag = 0
var stop = 0

function mainFunction(){
    const startIndex = currentPage * songsPerPage;
    const endIndex = startIndex + songsPerPage;
    var clutter = "";
    
    arr.slice(startIndex, endIndex).forEach(function(object, index){
        const songIndex = startIndex + index;
        if (used == true && songIndex == selectedSong){
            clutter = clutter + `<div class="song-card" id="${songIndex}">
            <div class="part1">
                <img src="${object.image}" alt="Song image">
                <h2>${object.name}</h2>
            </div>
            <div class="song-wrapper">
                <div class="another-wrapper">
                    <div class="now playing" id="music">
                        <span class="bar n1">A</span>
                        <span class="bar n2">B</span>
                        <span class="bar n3">c</span>
                        <span class="bar n4">D</span>
                    </div>
                </div>
                <h6>${object.duration}</h6>
            </div>
        </div>`
        if (selectedSong < arr.length - 1){
            forward.style.opacity = 1;
        }
        if (selectedSong > 0){
            back.style.opacity = 1;
        }
        } else {
            clutter = clutter + `<div class="song-card" id="${songIndex}">
            <div class="part1">
                <img src="${object.image}" alt="Song image">
                <h2>${object.name}</h2>
            </div>
            <h6>${object.duration}</h6>
        </div>`
        }
    })
    document.querySelector(".all-songs").innerHTML = clutter;
    
    if (page_flag == 0){
        audio.src = arr[selectedSong].url
        poster.style.backgroundImage = `url(${arr[selectedSong].image})`
        document.getElementById("song-title").textContent = arr[selectedSong].name;
    } else{
        page_flag = 0;
    }

}

function play_pause(){
    play.addEventListener("click", function(){
        if (flag == 0){
            audio.play();
            flag = 1
//            stop = 0;
            play.innerHTML = `<i class="ri-pause-fill"></i>`
        } else{
            flag = 0;
            audio.pause();
//            stop = 1;
            play.innerHTML = `<i class="ri-play-fill"></i>`
        }
    })
}

function Forward_Backward(){
    forward.addEventListener("click", function(){
        if (selectedSong < arr.length - 1){
            if (shuffleactive == true){
                selectedSong = Math.floor(Math.random() * arr.length);
            } else {
                selectedSong = selectedSong + 1;
            }
            mainFunction();
            audio.play();
        } else {
            forward.style.opacity = 0.4;
        }
    })

    back.addEventListener("click", function(){
        if (selectedSong > 0){
            if (shuffleactive == true){
                selectedSong = Math.floor(Math.random() * arr.length);
            } else{
                selectedSong = selectedSong - 1;
            }
            mainFunction();
            audio.play();
        } else {
            back.style.opacity = 0.4;
        }
    })
}

function progress_bar(){
    progressBar.addEventListener('input', function() {
        let progress = parseInt(progressBar.value);
        let newPosition = (progress / 100) * audio.duration;
        audio.currentTime = newPosition;
    })

    audio.addEventListener('timeupdate', function() {
        let progress = (audio.currentTime / audio.duration) * 100;
//        if (stop == 0){
//            play.innerHTML = `<i class="ri-pause-fill"></i>`
//        }
        progressBar.value = progress;
    })

    audio.addEventListener('ended', function() {
        if (selectedSong < arr.length - 1){
            if (shuffleactive == true){
                selectedSong = Math.floor(Math.random() * arr.length);
            }
            else {
                selectedSong = selectedSong + 1;
            }
            mainFunction();
            audio.play();
        } else {
            if (shuffleactive == true){
                selectedSong = Math.floor(Math.random() * arr.length);
            } else{
                selectedSong = 0;
            }
            mainFunction();
            audio.play();
        }
    })
}

function Shuffle(){
    document.querySelector(".shuffle").addEventListener("click", function(){
        if (shuffleactive == false){
            shuffleactive = true;
            document.querySelector(".shuffle").style.color = "rgba(91, 155, 0, 0.996)";
        } else {
            shuffleactive = false;
            document.querySelector(".shuffle").style.color = "white";
        }
    })
}

function nextPage() {
    if ((currentPage + 1) * songsPerPage < arr.length) {
        currentPage++;
        page_flag = 1;
        mainFunction();
    }
}
function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        page_flag = 1;
        mainFunction();
    }
}
document.getElementById("next-button").addEventListener("click", nextPage);
document.getElementById("previous-button").addEventListener("click", previousPage);

document.querySelector(".all-songs").addEventListener("click", function(e){
    selectedSong = e.target.id
    mainFunction();
    play.innerHTML = `<i class="ri-pause-fill"></i>`
    flag = 1;
    audio.play()
})


mainFunction();
play_pause();
progress_bar();
Shuffle();
Forward_Backward();
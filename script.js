var arr = [
    {name:"Azadi", url:"./songs/Azadi.mp3", image: "https://i.scdn.co/image/ab67616d0000b27399241710b1b1b590b79d444e", duration:"2:31"}, 
    {name: "Attitude", url:"./songs/Attitude.mp3", image: "https://i.scdn.co/image/ab67616d0000b273fd45e34bd6337969feb65bf9", duration:"3:31"}, 
    {name: "Cats", url:"./songs/Cats.mp3", image: "https://i.scdn.co/image/ab67616d0000b273ababb065e92613028d0e27ea", duration:"1:33"},
    {name: "Maharani ft. Arpit Bala", url:"./songs/Maharani.mp3",image:"https://i.scdn.co/image/ab67616d0000b273baea99dcf7614578bf5c3d10", duration:"6:29"}
]
// add more songs n all
var audio = new Audio()
var progressBar = document.getElementById('progress-bar');
var selectedSong = 3
var poster = document.querySelector(".poster")
var songtitle = document.querySelector(".songtitle")
var play = document.querySelector(".play")
var back = document.querySelector(".back")
var forward = document.querySelector(".forward")
var flag = 0;
var used = true;

function mainFunction(){
    var clutter = ""
    arr.forEach(function(object, index){
        if (used == true && index == selectedSong){
            clutter = clutter + `<div class="song-card" id="${index}">
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
            clutter = clutter + `<div class="song-card" id="${index}">
            <div class="part1">
                <img src="${object.image}" alt="Song image">
                <h2>${object.name}</h2>
            </div>
            <h6>${object.duration}</h6>
        </div>`
        }
    })
    document.querySelector(".all-songs").innerHTML = clutter;
    audio.src = arr[selectedSong].url

    poster.style.backgroundImage = `url(${arr[selectedSong].image})`
    document.getElementById("song-title").textContent = arr[selectedSong].name;
}

function play_pause(){
    play.addEventListener("click", function(){
        if (flag == 0){
            play.innerHTML = `<i class="ri-pause-fill"></i>`
            audio.play();
            flag = 1
        } else{
            play.innerHTML = `<i class="ri-play-fill"></i>`
            flag = 0;
            audio.pause();
        }
    })
}

function Forward_Backward(){
    forward.addEventListener("click", function(){
        if (selectedSong < arr.length - 1){
            selectedSong = selectedSong + 1;
            mainFunction();
            audio.play();
        } else {
            forward.style.opacity = 0.4;
        }
    })

    back.addEventListener("click", function(){
        if (selectedSong > 0){
            selectedSong = selectedSong - 1;
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
        progressBar.value = progress;
    })
}

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
Forward_Backward();
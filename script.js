console.log("lets write javaScript");
let currentSong = new Audio();

// Fetching songs from localhost ...
async function getSongs(){
   let a = await fetch("http://127.0.0.1:5500/songs/")
   let response = await a.text();
   // console.log(response) 

   let div = document.createElement("div")
   div.innerHTML = response;
   let as = div.getElementsByTagName("a")

   let songs = []
   for(let index = 0 ; index < as.length ; index++){
      const element = as[index];
      if(element.href.endsWith(".mp3")){
         songs.push(element.href.split("/songs/")[1])
      }
   }
   return songs
}

const playMusic = (track) =>{
   // let audio = new Audio("/songs/"+track);
   currentSong.src = "/songs/"+track;
   currentSong.play();
   play.src = "./assets/pause.svg"
   document.querySelector(".songinform").innerHTML = track
   document.querySelector(".songtime").innerHTML = "00:00 / 00:00 "
}

async function main(){ 

   // fetch song in list 
   let songs = await getSongs()
   // console.log(songs);

  let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
  
  for (const song of songs) {
     songUL.innerHTML = songUL.innerHTML + `<li class="">
     <i class="fa-solid fa-music fa-lg " style="color: #ffffff;"></i>
     <div class="songinfo ">
         <div class="songname">
            ${song.replaceAll("%20"," ")}
         </div>
         <div class="songArtist">
            songArtist
         </div>
     </div>
     <div class="playnow ">
           <p>play now</p>
           <i class="fa-regular fa-circle-play" style="color: #ffffff;"></i>
     </div>
   </li>`
  }

   // Play the first song
  

   //attach an eventlistner to each song 
   Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e)=>{
       e.addEventListener("click", element =>{
          playMusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim())
          console.log(e.querySelector(".songinfo").firstElementChild.innerHTML.trim())
         })
   })

   //Attach an event listner to play next and prev
   let play = document.getElementById("play")
   play.addEventListener("click", ()=>{
      if(currentSong.paused ){
         currentSong.play()
         play.src = "./assets/pause.svg"
      }
      else{
         currentSong.pause();
         play.src = "./assets/resume.svg"
      }
   })
 
}

main()
console.log("lets write javaScript");

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

async function main(){ 
   // fetch song in list 
   let songs = await getSongs()
   console.log(songs);

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
   var audio = new Audio(songs[0]);
   // audio.play();

   audio.addEventListener("loadeddata" , ()=>{
      console.log(audio.duration,audio.currentSrc,audio.currentTime);
   });

}

main()
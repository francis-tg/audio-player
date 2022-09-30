
const audios = document.querySelectorAll('.audio-item');
const audioNode = document.querySelector('audio');
const playBtn = document.querySelector('.play-pause')
const progress = document.querySelector('.progress');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous')
let currentAudio;
let currentDuration;
for (const item in audios) {
    if (Object.hasOwnProperty.call(audios, item)) {
        const audio = audios[item];
        const getAudioUrl = audio.children[1].getAttribute('href');
        const name = getAudioUrl.split('/').join('').split('.');
        audio.children[1].innerHTML = name[0]
        audio.children[1].addEventListener('click', (e) => {
            e.preventDefault();
            currentAudio = item
            audioNode.setAttribute('src', '.' + getAudioUrl)
            audioNode.play()
            playBtn.innerHTML = `<i class="feather pause icon-pause"></i>`
        }, false)
    }
}

document.querySelector("#myVolume").style.width = (audioNode.volume*100)+"%"

playBtn.addEventListener('click', () => {
    // console.log(playBtn.children[0])
    if (playBtn.children[0].classList.contains('pause')) {
        audioNode.pause()
        playBtn.innerHTML = `<i class="feather play icon-play"></i>`
    } else if (playBtn.children[0].classList.contains('play')) {
        audioNode.play()
        playBtn.innerHTML = `<i class="feather  pause icon-pause"></i>`
    }

    console.log(currentAudio)
})

audioNode.addEventListener('timeupdate', () => {
    const progressTime = audioNode.currentTime / audioNode.duration;
    currentDuration = progressTime
    progress.style.width =  (progressTime * 100 )+ "%"
})


next.addEventListener('click', () => {
    progress.setAttribute('value', 0)
    const audioIndex = parseInt(currentAudio) < audios.length - 1 ? parseInt(currentAudio) + 1 : 0
        // console.log(audios[parseInt(currentAudio) + 1].children[1].getAttribute('href'))
    const audioUrl = audios[audioIndex].children[1].getAttribute('href');
    // console.log(audioUrl)
    currentAudio = audioIndex;
    audioNode.setAttribute('src', '.' + audioUrl)
    audioNode.play()
    playBtn.innerHTML = ``
    playBtn.innerHTML = `<i class="feather play icon-play"></i>`
})

previous.addEventListener('click', () => {
    if(audioNode.currentTime <= 1){
        progress.style.width = "0%"
        const audioIndex = parseInt(currentAudio) > 0 ? parseInt(currentAudio) - 1 : audios.length -1
            // console.log(audios[parseInt(currentAudio) + 1].children[1].getAttribute('href'))
        const audioUrl = audios[audioIndex].children[1].getAttribute('href');
        // console.log(audioUrl)
        currentAudio = audioIndex;
        audioNode.setAttribute('src', '.' + audioUrl)
        audioNode.play()
        playBtn.innerHTML = ``
        playBtn.innerHTML = `<i class="feather pause icon-pause"></i>`
    }else audioNode.currentTime = 0
})

audioNode.addEventListener('ended', () => {
        const audioIndex = parseInt(currentAudio) < audios.length - 1 ? parseInt(currentAudio) + 1 : 0
            // console.log(audios[parseInt(currentAudio) + 1].children[1].getAttribute('href'))
        const audioUrl = audios[audioIndex].children[1].getAttribute('href');
        // console.log(audioUrl)
        currentAudio = audioIndex;
        audioNode.setAttribute('src', '.' + audioUrl)
        audioNode.play()
        playBtn.innerHTML = ``
        playBtn.innerHTML = `<i class="feather pause icon-play"></i>`
    })
    // if (audioNode.paused) {
    //     playBtn.setAttribute('name', 'play-circle')
    // }

const volumeScrub =(e) =>{
    const vol = (e.offsetX /document.querySelector('#volume-progressBar').offsetWidth);
    console.log(vol)
    audioNode.volume =vol;
    document.querySelector("#myVolume").style.width = (vol*100)+"%"
}

const Scrub = (e) => {
        // progress.s
        const scrubTime = (e.offsetX / document.querySelector('.progress-bar').offsetWidth) * audioNode.duration;
        progress.style.width = scrubTime + "%"
        audioNode.currentTime = scrubTime
            // }, 2000)
            // console.log(scrubTime)
    }
    // let mousedown = false;

    document.querySelector('.progress-bar').addEventListener('click', (e) => Scrub(e))
    document.querySelector('#volume-progressBar').addEventListener('click', (e) => volumeScrub(e))
    // document.querySelector('.progress').addEventListener('mousedown', (e) => mousedown = false)
    // document.querySelector('.progress').addEventListener('mouseup', (e) => mousedown = true)
const OpenFolder = document.querySelector(".open-folder");
// OpenFolder.addEventListener("click",async()=>{
//     await showOpenFilePicker({multiple:true}).then((sf)=>{
//         const audioTracks = sf;
//         // document.querySelector(".playlists").innerHTML  = ""
//         for (const aT in audioTracks) {
//             if (Object.hasOwnProperty.call(audioTracks, aT)) {
//                 const tracks = audioTracks[aT];
//                 // tracks.getFile(tracks.name).then((f)=>{
//                 //     console.log(URL.createObjectURL(tracks))
//                 //     window.webkitRequestFileSystem()
//                 // })
//                 tracks.move("./")
                
//                 // document.querySelector(".playlists").innerHTML  += PendAudioTrack(tracks.name, tracks.name)
//             }
//         }
//     })
  
// })

onvolumechange = (e)=>{
    console.log(e)
}

function PendAudioTrack(url,name){
    return `
    <div class="audio-item">
    <i class="feather icon-music audio-ico f-30"></i>
       <a href="${url}" class="item">${name}</a>
    </div>
    `
} 
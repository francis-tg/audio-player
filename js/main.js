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
            audioNode.setAttribute('src', getAudioUrl)
            audioNode.play()
            playBtn.innerHTML = `<i class="feather pause icon-pause"></i>`
        }, false)
    }
}

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
    progress.setAttribute('value', progressTime * 100)
})


next.addEventListener('click', () => {
    progress.setAttribute('value', 0)
    const audioIndex = parseInt(currentAudio) < audios.length - 1 ? parseInt(currentAudio) + 1 : 0
        // console.log(audios[parseInt(currentAudio) + 1].children[1].getAttribute('href'))
    const audioUrl = audios[audioIndex].children[1].getAttribute('href');
    // console.log(audioUrl)
    currentAudio = audioIndex;
    audioNode.setAttribute('src', audioUrl)
    audioNode.play()
    playBtn.innerHTML = ``
    playBtn.innerHTML = `<i class="feather play icon-play"></i>`
})

previous.addEventListener('click', () => {
    progress.setAttribute('value', 0)
    const audioIndex = parseInt(currentAudio) > 0 ? parseInt(currentAudio) - 1 : 0
        // console.log(audios[parseInt(currentAudio) + 1].children[1].getAttribute('href'))
    const audioUrl = audios[audioIndex].children[1].getAttribute('href');
    // console.log(audioUrl)
    currentAudio = audioIndex;
    audioNode.setAttribute('src', audioUrl)
    audioNode.play()
    playBtn.innerHTML = ``
    playBtn.innerHTML = `<i class="feather pause icon-pause"></i>`
})

audioNode.addEventListener('ended', () => {
        const audioIndex = parseInt(currentAudio) < audios.length - 1 ? parseInt(currentAudio) + 1 : 0
            // console.log(audios[parseInt(currentAudio) + 1].children[1].getAttribute('href'))
        const audioUrl = audios[audioIndex].children[1].getAttribute('href');
        // console.log(audioUrl)
        currentAudio = audioIndex;
        audioNode.setAttribute('src', audioUrl)
        audioNode.play()
        playBtn.innerHTML = ``
        playBtn.innerHTML = `<i class="feather pause icon-play"></i>`
    })
    // if (audioNode.paused) {
    //     playBtn.setAttribute('name', 'play-circle')
    // }

const Scrub = (e) => {
        progress.setAttribute('value', 0)
        const scrubTime = (e.offsetX / progress.offsetWidth) * audioNode.duration;
        // setTimeout(() => {
        progress.setAttribute('value', scrubTime)
        audioNode.currentTime = scrubTime
            // }, 2000)
            // console.log(scrubTime)
    }
    // let mousedown = false;

progress.addEventListener('click', (e) => Scrub(e))
    // document.querySelector('.progress').addEventListener('mousedown', (e) => mousedown = false)
    // document.querySelector('.progress').addEventListener('mouseup', (e) => mousedown = true)
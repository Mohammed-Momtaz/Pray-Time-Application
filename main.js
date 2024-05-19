let milady = document.getElementById("milady")
let hijri = document.getElementById("hijri")
let day = document.getElementById("day")
let hour = document.getElementById("hour")
let prays = document.querySelectorAll(".prays")

getDate()
updateHour()
setInterval(updateHour,1000)
getPTime("Elazig")

function updateHour() {
    let date = new Date()
    let now = `${date.getHours() < 10 ? `0${date.getHours()}`:date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}`:date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}`:date.getSeconds()}`
    hour.innerHTML = now
}

function getDate() {
    axios.get(`http://api.aladhan.com/v1/timingsByCity?city=Elazig&country=Turkey`)
    .then(function (response) {
        milady.innerHTML = response.data.data.date.gregorian.date
        hijri.innerHTML = response.data.data.date.hijri.date
        day.innerHTML = response.data.data.date.hijri.weekday.ar
    })
}

function getPTime(city) {
    axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Turkey`)
    .then(function (response) {
         let fajr = response.data.data.timings.Fajr
         let sunrise = response.data.data.timings.Sunrise
         let dhuhr = response.data.data.timings.Dhuhr
         let asr = response.data.data.timings.Asr
         let maghrib = response.data.data.timings.Maghrib
         let isha = response.data.data.timings.Isha
         prays[0].innerHTML = fajr
         prays[1].innerHTML = sunrise
         prays[2].innerHTML = dhuhr
         prays[3].innerHTML = asr
         prays[4].innerHTML = maghrib
         prays[5].innerHTML = isha
    })
}

let selectWrapper = document.querySelector('.custom-select-wrapper');
let select = selectWrapper.querySelector('.custom-select');
let options = selectWrapper.querySelectorAll('.custom-select-options div');

select.addEventListener('click', () => {
    selectWrapper.classList.toggle('open');
});

options.forEach(option => {
    option.addEventListener('click', () => {
        select.textContent = option.textContent;
        selectWrapper.classList.remove('open');
        getPTime(option.textContent)
    });
});

document.addEventListener('click', (e) => {
    if (!selectWrapper.contains(e.target)) {
        selectWrapper.classList.remove('open');
    }
});
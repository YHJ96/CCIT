import Cloud from '../assets/cloud.png';
import Cloudy from '../assets/cloudy.png';
import Sunny from '../assets/sunny.png';
import Lightning from '../assets/lightning.png';
import Rain from '../assets/rain.png';
import Hum from '../assets/hum.png';
import Wind from '../assets/wind.png';

export function WeatherImg(item) {
    const WeatherImg = [
        {
            Cloud: Cloud,
            Cloudy: Cloudy,
            Sunny: Sunny,
            Lightning: Lightning,
            Rain: Rain,
            Hum: Hum,
            Wind: Wind,
        }
    ]
    if (item === 'Thunderstorm') {
        return WeatherImg[0].Lightning
    } else if (item === 'Drizzle' || item === 'Rain') {
        return WeatherImg[0].Rain
    } else if (item === 'Clear') {
        return WeatherImg[0].Sunny
    } else if (item === 'Clouds') {
        return WeatherImg[0].Cloudy
    } else if (item === 'Mist' || item === 'Smoke' || item === 'Haze') {
        return WeatherImg[0].Cloud
    }
}

export function WeatherText(item) {
    if (item === 'Thunderstorm') {
        return '천둥'
    } else if (item === 'Drizzle' || item === 'Rain') {
        return '비'
    } else if (item === 'Clear') {
        return '맑음'
    } else if (item === 'Clouds') {
        return '흐림'
    } else if (item === 'Mist') {
        return '안개'
    }
}

export const WeatherIcon = [
    {
        Cloud: Cloud,
        Cloudy: Cloudy,
        Sunny: Sunny,
        Lightning: Lightning,
        Rain: Rain,
        Hum: Hum,
        Wind: Wind,
    }
]

export const URL = 'http://api.openweathermap.org/data/2.5/onecall?lat=37.658189026137904&lon=126.87198627389228&exclude=minutely,hourly,current,alert&units=metric&appid=a74a932d6988b374eb0477aba20a08e0'

export default WeatherImg;
import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()
    const icons = WeatherConditionIcons

    function formatKelvinToCelsius(kelvin) {
      return (kelvin - 273.15).toFixed(1)
    }

    function formatPressure(hPa) {
      return Math.round(hPa * 0.75)
    }

    function timeStringToMinutes(timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number)
      return hours * 60 + minutes
    }

    function isNight(currentTime, sunrise, sunset) {
      const currentMinutes = timeStringToMinutes(currentTime)
      const sunriseMinutes = timeStringToMinutes(sunrise)
      const sunsetMinutes = timeStringToMinutes(sunset)

      return currentMinutes < sunriseMinutes || currentMinutes >= sunsetMinutes
    }

    return {
      weatherData,
      icons,
      formatKelvinToCelsius,
      formatPressure,
      isNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in weatherData" class="weather-card" :class="{'weather-card--night': isNight(item.current.dt, item.current.sunrise, item.current.sunset)}">
          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              Гондор {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              07:17 {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{ icons[item.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ formatKelvinToCelsius(item.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ formatPressure(item.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})

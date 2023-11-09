import { drawChart } from "../components/chart";
import { service } from "../service";
import {months} from "../modules/period";

let days = ["Dush", "Sesh", "Chor", "Pay", "Jum", "Shan", "Yak"];

export async function weather() {
  const chart = document.querySelector("#chart");

  const weatherWrapper = document.querySelector(".weather__wrapper");

  function renderDailyWeather(wrapper, data) {
    const dates = days.map((_, i) => new Date(Date.now() + i * 86400000) );
    wrapper.innerHTML = data
      .map((item, i) => dailyWeatherComponent(item, dates[i]))
      .join("");
  }

  function dailyWeatherComponent(item, day) {
    return `
         <div class="flex items-center hover:bg-slate-100 cursor-pointer rounded-md w-full justify-between px-3">
          <span class="w-1/3 text-xs text-start">
            ${days[day.getDay()]} ${months.map(month => month.slice(0, 3))[day.getMonth()]} ${day.getDate()}
          </span>
          <div class="flex w-2/3 items-center justify-end text-xs">
            <div class="flex items-center justify-between gap-0 gap-2">
                 <img width="" alt="" class="w-1/4 " src="https://openweathermap.org/img/w/${
                   item.weather[0].icon
                 }.png" />
                  <span class="text-xs">
                    ${Math.ceil(item.temp.max)} / ${Math.ceil(item.temp.min)}°C
                  </span>     
            </div>
          </div>
        </div>`;
  }

  const daily = await service("/api/modul/weather7-daily/");

  const hourly = await service("/api/modul/weather24-hourly/");

  const labels = hourly[0].weather.map((item, i) => `${i}:00`);

  const hourlyTemperature = hourly[0].weather.map((item, i) =>
    Math.round(item.feels_like)
  );

  renderDailyWeather(weatherWrapper, daily[0].weather);

  drawChart(chart, labels, hourlyTemperature).then(() =>
    console.log("weather loaded")
  );
}

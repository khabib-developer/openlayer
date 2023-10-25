import { drawChart } from "../components/chart";
import { service } from "../service";

export async function weather() {
  const chart = document.querySelector("#chart");

  const weatherWrapper = document.querySelector(".weather__wrapper");

  function renderDailyWeather(wrapper, data) {
    let days = [0, 1, 2, 3, 4, 5, 6];
    days = days.map((_, i) => new Date(Date.now() + i * 86400000));
    wrapper.innerHTML = data
      .map((item, i) => dailyWeatherComponent(item, days[i]))
      .join("");
  }

  function dailyWeatherComponent(item, day) {
    return `
         <div class="flex items-center hover:bg-slate-100 cursor-pointer rounded-md w-full justify-between px-3">
          <span class="text-base flex-1 text-start">${day
            .toString()
            .slice(0, 10)}</span>
          <div class="flex flex-1 items-center text-base">
            <div class="flex items-center">
                 <img width="" alt="" src="https://openweathermap.org/img/w/${
                   item.weather[0].icon
                 }.png" />
                  <span>
                    ${Math.ceil(item.temp.max)} / ${Math.ceil(item.temp.min)}°C
                  </span>     
            </div>
            <span class="pl-4 text-xs text-end flex-1 text-gray-500">${
              item.weather[0].description
            }</span>
          </div>
        </div>
      `;
  }

  const daily = await service("/api/modul/weather3-daily/");

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

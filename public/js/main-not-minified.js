const icon = document.querySelector("#wicon");
const temprature = document.querySelector("#wtemp");
const climate = document.querySelector("#wclimate");
const loc = document.querySelector("#wloc");
const rain = document.querySelector("#wrain");
const gps = document.querySelector("#gps");
const err = document.querySelector("#error");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  err.textContent = "";
  var address = String(gps.value);
  if (address.trim().length != 0) {
    document.querySelector(".weather-info").classList.remove("show");
    fetch("/weather?address=" + address)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if (!data["error"]) {
          document.querySelector(".weather-info").classList.add("show");
          temprature.textContent = data["temperature"];
          rain.textContent = `${data["chance_for_rain"]}% chance of rain`;
          t = data["temperature"];
          r = data["chance_for_rain"];
          if (t <= 5) icon.src = "/img/snowy.svg";
          else if (r > 20) icon.src = "/img/thunder.svg";
          else if (t <= 30) icon.src = "/img/normal.svg";
          else icon.src = "/img/summer.svg";

          loc.textContent = data["address"];
          climate.textContent = data["forecast"];
        } else err.textContent = data["error"];
      });
  } else {
    err.textContent = "Sorry, you didn't provide any location.";
  }
});


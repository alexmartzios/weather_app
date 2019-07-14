window.addEventListener('load', ()=> {
  let long;
  let lat;
  let locTimezone = document.querySelector('.loc-timezone');
  let tempDegree = document.querySelector('.degree');
  let tempDesc = document.querySelector('.desc');
  let degreeSection = document.querySelector(".degree-section");
  let degreeSpan = document.querySelector(".degree-section span");

  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/159277bf4c4a8f043d1b5a3c0126f440/${lat},${long}`;


        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Setting the DOM elements from the fetched API.
          tempDegree.textContent = temperature;
          tempDesc.textContent = summary;
          locTimezone.textContent = data.timezone;
          //Formula for celsius degree change.
          let celsius = (temperature - 32) * (5 / 9);
          //Setting the Icons.
          setIcons(icon, document.querySelector(".icon"));
          //Changing the temperature to Celsius/Farenheit.
          degreeSection.addEventListener('click', ()=> {
             if (degreeSpan.textContent === "F") {
               degreeSpan.textContent = "C";
               tempDegree.textContent = Math.floor(celsius);
             } else {
               degreeSpan.textContent = "F";
               tempDegree.textContent = temperature;
             }
          });
        });
      });

  } else {
      h1.textContent = "pls allow the geoloc :)"
  };

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});

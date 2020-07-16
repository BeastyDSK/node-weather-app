const form = document.querySelector('form');

function current(){
    const result_place = document.querySelector('.result-place');
    const result_type = document.querySelector('.result-type');
    const result_temp = document.querySelector('.result-temprature');
    const result_rain = document.querySelector('.result-rain');
    const result_img = document.querySelector('.result-img');

    const res = document.querySelector('.res');
    res.textContent = 'loading...';
    result_place.textContent = "";
    result_type.textContent = "";
    result_temp.textContent = "";
    result_rain.textContent = "";
    result_img.style.visibility='hidden';
    result_img.src="";


    function showPosition(position){
        // console.log(position.coords.longitude,position.coords.latitude);
        fetch(`/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then((response)=>{
        
            response.json().then((data)=>{
                if(!data.error)
                {
                    if(data.chance_for_rain<=10){
                        var d = (Math.random()*2).toFixed(0);
                        result_img.src=`/img/cloudy-day-${d}.svg`;
                    }
                    else if(data.chance_for_rain>10 && data.chance_for_rain<=50){
                        var d = (Math.random()*3).toFixed(0);
                        result_img.src=`/img/rainy-${d}.svg`;
                    }
                    else{
                        var d = (Math.random()*3).toFixed(0);
                        result_img.src=`/img/thunder-${d}.svg`;
                    }

                    result_img.classList.add('weather-img');
                    result_img.style.visibility='visible';

                    res.textContent = "";
                    result_place.textContent = data.address;
                    result_type.textContent = data.forecast;
                    result_temp.textContent = data.temperature;
                    result_rain.textContent = `There is a ${data.chance_for_rain}% chance for rain.`;
                }
                else
                {
                    result.textContent = data.error;
                }
        
            })
        })
    }
    function ErrorHandler(err){
        if(err.code === 1){
            res.textContent = 'Please allow location';
        }
        else{
            res.textContent = 'Sorry no internet connection'

        }
    }
    navigator.geolocation.getCurrentPosition(showPosition,ErrorHandler);
}

form.addEventListener('submit',(event)=>{
    
    event.preventDefault();
    const address = document.querySelector('input').value;
    const result_place = document.querySelector('.result-place');
    const result_type = document.querySelector('.result-type');
    const result_temp = document.querySelector('.result-temprature');
    const result_rain = document.querySelector('.result-rain');
    const result_img = document.querySelector('.result-img');

    const res = document.querySelector('.res');
    res.textContent = 'loading...';
    result_place.textContent = "";
    result_type.textContent = "";
    result_temp.textContent = "";
    result_rain.textContent = "";
    result_img.style.visibility='hidden';
    result_img.src = "";

    fetch('/weather?address='+address).then((response)=>{
    
        response.json().then((data)=>{
    
            if(!data.error)
            {
                if(data.chance_for_rain<=10){
                    var d = (Math.random()*2).toFixed(0);
                    result_img.src=`/img/cloudy-day-${d}.svg`;
                }
                else if(data.chance_for_rain>10 && data.chance_for_rain<=50){
                    var d = (Math.random()*3).toFixed(0);
                    result_img.src=`/img/rainy-${d}.svg`;
                }
                else{
                    var d = (Math.random()*3).toFixed(0);
                    result_img.src=`/img/thunder-${d}.svg`;
                }

                result_img.classList.add('weather-img');
                result_img.style.visibility='visible';

                res.textContent = "";
                result_place.textContent = data.address;
                result_type.textContent = data.forecast;
                result_temp.textContent = data.temperature;
                result_rain.textContent = `There is a ${data.chance_for_rain}% chance for rain.`;
            }
            else
            {
                res.textContent = data.error;
            }
    
        })
    })
})
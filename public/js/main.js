const form = document.querySelector('form');

function current(){
    const result = document.querySelector('.result');
    const res = document.querySelector('.res');
    result.textContent = 'loading...';
    res.textContent = '';
    function showPosition(position){
        console.log(position.coords.longitude,position.coords.latitude);
        fetch(`/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then((response)=>{
        
            response.json().then((data)=>{
        
                if(!data.error)
                {
                    result.textContent = data.address;
                    res.textContent = `${data.forecast}.The Temperature is about ${data.temperature}.There is a ${data.chance_for_rain}% chance for rain.`;
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
            result.textContent = 'Please allow location';
        }
        else{
            result.textContent = 'Sorry no internet connection'

        }
    }
    navigator.geolocation.getCurrentPosition(showPosition,ErrorHandler);
}

form.addEventListener('submit',(event)=>{
    
    event.preventDefault();
    const address = document.querySelector('input').value;
    const result = document.querySelector('.result');
    const res = document.querySelector('.res');
    result.textContent = 'loading...';
    res.textContent = '';
    
    fetch('/weather?address='+address).then((response)=>{
    
        response.json().then((data)=>{
    
            if(!data.error)
            {
                result.textContent = data.address;
                res.textContent = `${data.forecast}.The Temperature is about ${data.temperature}.There is a ${data.chance_for_rain}% chance for rain.`;
            }
            else
            {
                result.textContent = data.error;
            }
    
        })
    })
})
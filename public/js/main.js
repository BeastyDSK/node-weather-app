const form = document.querySelector('form');

form.addEventListener('submit',(event)=>{
    
    event.preventDefault();
    const address = document.querySelector('input').value;
    const result = document.querySelector('.result');
    const res = document.querySelector('.res');
    result.textContent = 'loading...';
    res.textContent = '';
    fetch('/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(!data.error){
                result.textContent = data.address;
                res.textContent = `${data.forecast}.The Temperature is about ${data.temperature}.There is a ${data.chance_for_rain}% chance for rain.`;
            }
            else{
                result.textContent = data.error;
            }
        })
    })
})
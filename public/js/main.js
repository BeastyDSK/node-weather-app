console.log('hi there');

const form = document.querySelector('form');

form.addEventListener('submit',(event)=>{
    
    event.preventDefault();
    const address = document.querySelector('input').value;
    const result = document.querySelector('.result');
    const res = document.querySelector('.res');
    result.textContent = 'loading...';
    res.textContent = '';
    fetch('http://localhost:1234/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(!data.error){
                result.textContent = data.address;
                res.textContent = data.forecast;
            }
            else{
                result.textContent = data.error;
            }
        })
    })
})
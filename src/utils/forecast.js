const request = require('request')

const forecast = (longitude,latitude,callback)=>{
    
    const WeatherURL = `https://api.darksky.net/forecast/fe4dab721a468ef026685a773839dafa/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`
    // const WeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(data.lat)}&lon=${encodeURIComponent(data.long)}&appid=55f7c5fa70b5b74be167f77b06e5d06e`
    
    request({url:WeatherURL,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to Location services',undefined)
        }
        else if(body.error){
            callback('location is Invalid',undefined)
        }
        else{
            callback(undefined,body)
        }
    })
}

module.exports = forecast
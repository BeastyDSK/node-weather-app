const request = require("request")

const GeoCode = (location,callback)=>{

    const GeocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?limit=1&access_token=pk.eyJ1Ijoia3Jpc2huYWRzayIsImEiOiJja2EzaGltbzkwNm40M2tvNDlueGo4NW9wIn0.YLvgwSX4baon3DSK5RTFhg`
    
    request({url:GeocodeURL,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to contact location services.',undefined)
        }
        else if(body.features.length===0){
            callback('Location Not Available.Try Another Search or Check the Location.',undefined)
        }
        else
        {
            callback(undefined,{
                lat : body.features[0].center[1],
                long : body.features[0].center[0],
                place : body.features[0].place_name
            })
        }
    })
}

module.exports = GeoCode
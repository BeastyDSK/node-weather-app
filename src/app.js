// Loading the default and required npm modules
const path = require('path')
var sslRedirect = require('heroku-ssl-redirect');
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()



// making the request to https

app.use(sslRedirect());

// settig up the port to work with.
const port = process.env.PORT || 1234

// setting up the default directories
const PathforExpress = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../html/views')
// const partialPath = path.join(__dirname,'../html/partials')

//setting up the handle bar engine
app.set('view engine','hbs')

// setting up the path in which the handlebar loads the file
// default is views deirectory
app.set('views',viewsPath)

app.use(express.static(PathforExpress))

// registering handlebar partials
// hbs.registerPartials(partialPath)

// setting up the get request to send the data when some access the server
app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather'
    })
})

// app.get('/help',(req,res)=>{
//     res.render('help', {
//         title:'Help'
//     })
// })

// app.get('/about',(req,res)=>{
//     res.render('about', {
//         title:'About'
//     })
// })

app.get('/weather',(req,res)=>{
    // res.send({
    //     lat:parseFloat(req.query.lat),
    //     lon:parseFloat(req.query.lon)
    // })
    if(req.query.lat && req.query.lon){
        geocode.withcoords(parseFloat(req.query.lat),parseFloat(req.query.lon),(Gerror,{place}={})=>{
            if(Gerror){
                return res.send({
                     error:Gerror
                })
            }
            forecast(parseFloat(req.query.lon),parseFloat(req.query.lat),(Ferror,Fdata)=>{
                if(Ferror){
                    return res.send({
                        error:Ferror
                    })
                }
                res.send({
                    temperature:`${Fdata.currently.temperature} Celcius`,
                    chance_for_rain:(Fdata.currently.precipProbability*100).toFixed(0),
                    address:place,
                    forecast:Fdata.currently.summary
                })
            })
        })
    }
    else if(req.query.address){
        geocode.withlocation(req.query.address,(Gerror,{lat,long,place}={})=>{
            if(Gerror){
                return res.send({
                    error:Gerror
                })
            }
            forecast(long,lat,(Ferror,Fdata)=>{
                if(Ferror){
                    return res.send({
                        error:Ferror
                    })
                }
                res.send({
                    temperature:`${Fdata.currently.temperature} Celcius`,
                    chance_for_rain:(Fdata.currently.precipProbability*100).toFixed(0),
                    address:place,
                    forecast:Fdata.currently.summary
                })
            })
        })
    }
    else{
        res.send({
            error:'Sorry you wont provided any location...'
        })
    }
})

app.get('*',(req,res)=>{
    res.send('We are working on it.It will available ASAP')
})

// setting up the server to start on localhost with a port of 1234 
app.listen(port,()=>{
    console.log(`server starting on ${port}.`)
})
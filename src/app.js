// Loading the default and required npm modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// setting up the default directories
const PathforExpress = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../html/views')
const partialPath = path.join(__dirname,'../html/partials')

//setting up the handle bar engine
app.set('view engine','hbs')

// setting up the path in which the handlebar loads the file
// default is views deirectory
app.set('views',viewsPath)

app.use(express.static(PathforExpress))

// registering handlebar partials
hbs.registerPartials(partialPath)

// setting up the get request to send the data when some access the server
app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About'
    })
})

app.get('/weather',(req,res)=>{
    if(req.query.address){
        geocode(req.query.address,(Gerror,{lat,long,place}={})=>{
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
                    forecast:`${Fdata.currently.summary}.The Temperature is about ${Fdata.currently.temperature} Celcius.There is a ${Fdata.currently.precipProbability*100}% chance for rain.`,
                    address:place
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

app.get('/help/*',(req,res)=>{
    res.send('We are working on it.It will available ASAP')
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        error:'Page Not Found'
    })
})

// setting up the server to start on localhost with a port of 1234 
app.listen(1234,()=>{
    console.log('server on 1234')
})
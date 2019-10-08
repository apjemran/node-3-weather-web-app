const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
const app = express()
// Define path for express config
const pubDirPath = path.join(__dirname,'../public')
const viewDirPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewDirPath)
//Setup static directory to server
app.use(express.static(pubDirPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
     res.render('index',{
         title: 'Weather App',
         name: 'Mohd Emran Khan'
     })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Weather',
        name: 'Mohd Emran Khan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This helpful tip for help page',
        title:'Help',
        name: 'Mohd Emran Khan'
    })
})
app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
           error: 'Address must be provided'
        })
    }
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,foreCastData)=>{
            if(error){
                return res.send({error})
            }
            return res.send({
                forecast: foreCastData,
                location,
                address: address,
                highTemperature: foreCastData.highTemp,
                lowTemperature: foreCastData.lowTemp
            })
        })
    })    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMessage:'Help article not found',
        name: 'Mohd Emran Khan'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage:'Page Not Found',
        name: 'Mohd Emran Khan'
    })
})

app.listen(port,()=>{
    console.log('Express is up and running on port '+port)
})
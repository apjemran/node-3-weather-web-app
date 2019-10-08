const request = require('request')

const forecast = (latitute,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/3e0fa4074d585b33046f3a78bce7b751/'
    +encodeURIComponent(latitute)+','+encodeURIComponent(longitude)
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect forecast api', undefined)
        }else if(body.error){
            callback('Request is not formed properly', undefined)
        }else{
            callback(undefined, {
                dailysummary : body.daily.summary,
                prediction : 'There is currently '+ body.currently.temperature+ ' degrees outside and there is '
                +body.currently.precipProbability+'% chance of rain',
                highTemp: 'Highest Temperature: '+body.daily.data[0].temperatureHigh,               
                lowTemp: 'Lowest Temperature: '+ body.daily.data[0].temperatureLow
            })
        }

    })

}

module.exports = forecast
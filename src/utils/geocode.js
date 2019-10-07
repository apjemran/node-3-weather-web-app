const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXBqZW1yYW4iLCJhIjoiY2sxZDFvY2hvMDNocTNubndneXBrYzdhcSJ9.QuF3mFx-J1Bwr-e-3qCuFA&limit=1'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect mapbox api',undefined)
        }else if(body.features.length===0){
            callback('Address not found try with another address', undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
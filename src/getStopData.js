const request = require('request')

export default class {

    static getStopData(event, context, cb) {
        
        let body=  "{stop(id: \"HSL:1210110\") {name, stoptimesWithoutPatterns {scheduledArrival, realtimeArrival, arrivalDelay, scheduledDeparture, realtimeDeparture, departureDelay, realtime, realtimeState, serviceDay, headsign}}}"
        const url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
       
        const params = {
            url,
            headers: {'Content-Type': 'application/graphql'},
            body
          }
        
       request.post(params, (err, httpResponse, body) => { 
        if(err) {
            console.log('error:')
            console.log(JSON.stringify(err))
            cb(`Error occurred calling hsl api: ${err}`, null)
            return
        }
        console.log('Statuscode:')
        console.log(JSON.stringify(httpResponse.statusCode))
        console.log(JSON.stringify(body))
        if ('data' in body) {
            /*
            const parsedBody = JSON.parse(body)
            const stopName = parsedBody.data.stop.name
            const arrivalList = parsedBody.data.stop.stoptimesWithoutPatterns
            */
            cb(null, body.data)
            return
        }
        console.log('There is no data to return')
        cb(null, null)
        })
    }
}

const CloudAPI = require('./api')
const config = require('../config')
const fs = require('fs')

module.exports = {
    buildPlayList : async function() {
        let playlist = config.playlist
        for (var key in playlist) {
            if (playlist.hasOwnProperty(key)) {
                console.log(playlist[key])
                let res = await CloudAPI.getPlayList(playlist[key])
                let resObj = JSON.parse(res.text)
                let pl = []
                for (var e in resObj.tracks) {
                    if (object.hasOwnProperty(e)) {
                        pl.push(resObj.tracks[e].id)
                    }
                }
            }
        }
    }
}
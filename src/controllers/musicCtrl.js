import fs from 'fs'
import path from 'path'
import api from '../api/cloudApi'

const config = require('../../fm.json')

const listPath = path.join(__dirname, "../../public/music")

async function buildMusic(songId) {
    let detail = await api.getDetail(songId)
    let detailObj = JSON.parse(detail.text)['songs'][0]
    let result = {}
    result['articles'] = ''
    detailObj['ar'].forEach(e => {
        result['articles'] += e['name']
    })
    result['song'] = detailObj['name']
    result['album_name'] = detailObj['al']['name']
    result['album_url'] = await api.pic2Url(detailObj['al']['pic_str'])
    let songUrl = await api.getUrl(songId)
    result['mp3'] = JSON.parse(songUrl.text)['data'][0]["url"]

    return result;
}

export default {
    getRandom : async (ctx, next) => {
        let type = ctx.query['type'] ? ctx.query['type'] : 'all'
        let filePath = path.join(listPath, type + ".json")
        let list = JSON.parse(fs.readFileSync(filePath))
        let random = Math.floor(Math.random() * list.length)
        console.log(random)
        console.log(list[random])
        let result = await buildMusic(list[random])
        console.log(result)
        ctx.body = JSON.stringify(result)
    },

    buildList: async (ctx, next) => {
        try {
            let all = []
            for (let item of config.playList) {
                let res = await api.getPlayList(item["id"])
                let resJSON = JSON.parse(res.text);
                let trackIds = resJSON['playlist']['trackIds'];
                let list = []
                trackIds.forEach(({id}) => {
                    list.push(id)
                })
                let filePath = path.join(listPath, item["type"] + ".json")
                fs.writeFileSync(filePath, JSON.stringify(list))
                all = all.concat(list)
            }
            fs.writeFileSync(path.join(listPath, "all.json"), JSON.stringify(all))
            ctx.body = JSON.stringify(all)
        } catch (err) {
            console.log(err)
            ctx.body = null
        }
    },

    getMusic: async (ctx, next) => {
        const songId = ctx.query['songId']
        let result = await buildMusic(songId)
        ctx.body = JSON.stringify(result)
    },

    getPlayList: async (ctx, next) => {
        const query = ctx.query
        let playList = await api.getPlayList(query['playList'])
        ctx.body = playList.text;
    },

    getUrl: async (ctx, next) => {
        const songId = ctx.query['songId']
        let url = await api.getUrl(songId)
        ctx.body = url.text;
    }
}
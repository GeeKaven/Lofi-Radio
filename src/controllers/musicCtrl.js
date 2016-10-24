import fs from 'fs'
import path from 'path'
import api from '../api/cloudApi'

const config = require('../../fm.json')

const listPath = path.join(__dirname, "../../public/music")

export default {
    getRandomMusic : async (ctx, next) => {
        
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
                all.push(list)
            }
            fs.writeFileSync(path.join(listPath, "all.json"), JSON.stringify(all))
            ctx.body = JSON.stringify(all)
        } catch (err) {
            console.log(err)
            ctx.body = null
        }
    },

    getMusic: async (ctx, next) => {
        const query = ctx.query
        let detail = await api.getDetail(query['songId'])
        console.log(detail.text)
    },

    getPlayList: async (ctx, next) => {
        const  query = ctx.query
        let playList = await api.getPlayList(query['playList'])
        ctx.body = playList.text;
    }
}
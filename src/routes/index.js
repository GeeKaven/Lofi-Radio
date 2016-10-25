import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import musicCtrl from '../controllers/musicCtrl'

const router = Router()

router
    .get('/', indexCtrl)
    .get('/api/buildList', musicCtrl.buildList)
    .get('/api/getMusic', musicCtrl.getMusic)
    .get('/api/getPlayList', musicCtrl.getPlayList)
    .get('/api/getUrl', musicCtrl.getUrl)

export default router

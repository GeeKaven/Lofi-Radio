var router = require('koa-router')();
const handle = require('../src/handle')

router.get('/', async function (ctx, next) {
  await ctx.render('index', {});
})

router.get('rand', async function (ctx, next) {
  
})

router.get('build_list',  async function (ctx, next) {
     ctx.body = await handle.buildPlayList()
})

module.exports = router;

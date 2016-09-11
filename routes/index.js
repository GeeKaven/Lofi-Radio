var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  await ctx.render('index', {});
})

router.get('rand', async function (ctx, next) {
  
})

module.exports = router;

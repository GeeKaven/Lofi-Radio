
export default async (ctx, next) => {

  await ctx.render('index', {
      title : "NekoFM",
      desc : "Music change the world"
  })
}

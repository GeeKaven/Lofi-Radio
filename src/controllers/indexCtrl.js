
export default async (ctx, next) => {

  await ctx.render('index', {
    title : "Hello"
  })
}

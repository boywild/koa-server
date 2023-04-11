async function auth(ctx, next) {
  try {
    await next()
  } catch (e) {
    console.log(e)
  }
}

module.exports = auth

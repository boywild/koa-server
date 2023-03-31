async function Exception(ctx, next) {
  try {
    await next()
  } catch (e) {
    console.log(e)
  }
}

module.exports = Exception

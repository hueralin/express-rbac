async function authentication (req, res, next) {
  console.log('session: ', req.session)
  if (req.session.userInfo) {
    next()
  } else {
    res.redirect(401, '/login')
  }
}

module.exports = authentication

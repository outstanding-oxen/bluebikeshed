function isSelfOrAdmin(req, res, next) {
  if (req.params.id == req.user.id || req.user.isAdmin) return next()
  res.redirect('/')
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next()
  res.redirect('/')
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = {isAdmin, isSelfOrAdmin, isLoggedIn}

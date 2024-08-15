export function validateSchema(Schema){
  return (req, res, next) => {
    try {
      Schema.parse(req.body)
      next()
    } catch (error) {
      return res.status(400).json({ error: error.issues.map(e => e.message) })
    }
  }
}
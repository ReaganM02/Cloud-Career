import jwt from 'jsonwebtoken'

function jwtSign (payload: object, options?: jwt.SignOptions): string {
  const token = jwt.sign(payload, useRuntimeConfig().JWT_SECRET, options)
  return token
}

export default jwtSign

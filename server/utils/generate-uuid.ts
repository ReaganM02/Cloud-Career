import { customAlphabet } from 'nanoid'

export default function (length: number) {
  const generateUUID = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', length)
  return generateUUID()
}
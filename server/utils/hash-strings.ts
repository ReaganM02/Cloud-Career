import { hash } from 'bcrypt'

async function hasStrings(data: string): Promise<string> {
  return await hash(data, 12)
}

export default hasStrings
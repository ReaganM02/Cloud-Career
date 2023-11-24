import { MongoError } from 'mongodb'
import { IUserBody } from '~/types/user-schema'

export default defineEventHandler(async (event) => {
  try {
    const { firstName, lastName, email, password, companyName, companyWebsite, linkedIn } = await readBody<IUserBody>(event)

    if (!firstName) { return displayError({ statusCode: 400, cause: 'First Name is required.' }) }
    if (!lastName) { return displayError({ statusCode: 400, cause: 'Last Name is required.' }) }
    if (!email) { return displayError({ statusCode: 400, cause: 'Email is required.' }) }
    if (!password) { return displayError({ statusCode: 400, cause: 'Password is required.' }) }
    if (!companyName) { return displayError({ statusCode: 400, cause: 'Company Name is required.' }) }
    if (!companyWebsite) { return displayError({ statusCode: 400, cause: 'Company Website is required.' }) }
    if (!linkedIn) { return displayError({ statusCode: 400, cause: 'LinkedIn is required.' }) }

    const { uuid } = await userModel.create({
      uuid: generateUuid(12),
      firstName: sanitize(firstName),
      lastName: sanitize(lastName),
      email: sanitize(email),
      password: await hashStrings(password),
      companyName: sanitize(companyName),
      companyWebsite: sanitize(companyWebsite),
      linkedIn: sanitize(linkedIn)
    })

    const token = jwtSign({ uuid })

    return token
  } catch (error) {
    if (error instanceof TypeError) {
      if (error.message.includes('Cannot destructure property')) {
        return displayError({ statusCode: 500, cause: 'First Name, Last Name, Email, Password, Company Name, Company Website, LinkedIn fields are required.' })
      }
      return displayError({ statusCode: 400, cause: 'Error. Bad request.' })
    }
    if (error instanceof MongoError) {
      if (error.code === 11000) {
        return displayError({ statusCode: 400, cause: 'Email already exist.' })
      }
    }
    return displayError({ statusCode: 500, cause: 'Something is wrong with the server. Please contact the administrator.' })
  }
})

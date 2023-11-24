export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)
    if (!email) { return displayError({ statusCode: 400, cause: 'Email is required.' }) }
    if (!password) { return displayError({ statusCode: 400, cause: 'Password field is required.' }) }

    const user = await userModel.findOne({ email })
    if (!user) { return displayError({ statusCode: 400, cause: 'Email or password is invalid.' }) }

    return user
  } catch (error) {
    if (error instanceof TypeError) {
      if (error.message.includes('Cannot destructure property')) {
        return displayError({ statusCode: 500, cause: 'Email and password fields are required.' })
      }
      return displayError({ statusCode: 400, cause: 'Error. Bad request.' })
    }
    return displayError({ statusCode: 500, cause: 'Something is wrong with the serever. Please contact the administrator.' })
  }
})

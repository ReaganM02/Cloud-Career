import mongoose from 'mongoose'

export default defineNitroPlugin(async (_nitroApp) => {
  await mongoose.connect(useRuntimeConfig().MONGO_URI)
  // eslint-disable-next-line no-console
  console.log('Successfully connected to DB.')
})

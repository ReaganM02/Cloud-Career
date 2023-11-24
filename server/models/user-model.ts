import mongoose from 'mongoose'
import { IUserSchema } from '~/types/user-schema'

const userSchema = new mongoose.Schema<IUserSchema>({
  uuid: {
    type: String,
    required: [true, 'UUID is required.'],
    index: {
      unique: true
    }
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required.']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  companyName: {
    type: String,
    required: [true, 'Company Name is required.']
  },
  companyWebsite: {
    type: String,
    required: [true, 'Company Website is required.']
  },
  linkedIn: {
    type: String,
    required: [true, 'LinkedIn is required.']
  }
})

export default mongoose.model<IUserSchema>('User', userSchema)

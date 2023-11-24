export interface IUserSchema {
  uuid: string
  firstName: string
  lastName: string
  email: string
  password: string
  companyName: string
  companyWebsite: string
  linkedIn: string
}

export interface IUserBody extends Omit<IUserSchema, 'uuid'> { }

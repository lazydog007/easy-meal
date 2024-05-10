import { Document, Schema, model, models } from "mongoose"
export interface IModelLimit {
  model: string
  requests: number
}
export interface IUser extends Document {
  userId: string
  email: string
  // username: string
  photo?: string
  firstName?: string
  lastName?: string
  // limits?: IModelLimit[]
}

// const ModelLimit = new Schema({
//   model: { type: String, required: true },
//   requests: { type: Number, required: true },
// })

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  // username: { type: String, required: true, unique: true },
  photo: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: Number, default: 1 },
  // creditBalance: { type: Number, default: 10 },
  // limits: { type: [ModelLimit], required: true },
})

const User = models?.User || model("User", UserSchema)

export default User

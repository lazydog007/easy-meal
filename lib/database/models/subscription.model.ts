import { Document, model, models, Schema } from "mongoose"

export interface ISubscription extends Document {
  userId: string
  membership: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  currentPeriodEnd: Date
}

const SubscriptionSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  membership: { type: String, required: true, unique: true },
  stripeCustomerId: { type: String, required: true, unique: true },
  stripeSubscriptionId: { type: String, required: true, unique: true },
  currentPeriodEnd: { type: Date, required: true },
})

export const Subscription =
  models?.Subscription || model("Subscription", SubscriptionSchema)

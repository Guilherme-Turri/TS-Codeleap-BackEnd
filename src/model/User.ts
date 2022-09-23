import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
  },
);
userSchema.path('email').validate(async (email: any) => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, 'user already exists');

export const userModel = model('User', userSchema);

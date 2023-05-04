import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatarPic:{ type: String, default: 'https://firebasestorage.googleapis.com/v0/b/gallery-51db9.appspot.com/o/images%2F66b05f9e-382c-44ce-ba9d-e773780da423?alt=media&token=d0638256-6969-4f39-9bb8-859767c71d3f' }
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

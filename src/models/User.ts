import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    next();
});

userSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWTToken = function () {
    const token = jwt.sign(
        {
            id: this._id,
        },
        process.env.JWT_TOKEN_SECRET!,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRY! || "7d",
        }
    );
    return token;
};

export default mongoose.models.User || mongoose.model("User", userSchema);

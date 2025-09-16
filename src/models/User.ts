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
    const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
    const JWT_TOKEN_EXPIRY = process.env.JWT_TOKEN_EXPIRY;

    if (!JWT_TOKEN_SECRET) {
        throw new Error(
            "JWT_TOKEN_SECRET is not defined in environment variables"
        );
    }

    if (!JWT_TOKEN_EXPIRY) {
        throw new Error(
            "JWT_TOKEN_EXPIRY is not defined in environment variables"
        );
    }

    try {
        const token = jwt.sign(
            {
                id: this._id.toString(),
                email: this.email,
            },
            JWT_TOKEN_SECRET,
            {
                expiresIn: JWT_TOKEN_EXPIRY,
            }
        );
        return token;
    } catch (error) {
        throw new Error(`Failed to generate JWT token: ${error}`);
    }
};

export default mongoose.models.User || mongoose.model("User", userSchema);

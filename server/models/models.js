import { userSchema } from "../schema/users";
import { productSchema } from "../schema/product";
import mongoose from "mongoose";

export const User = mongoose.model("User", userSchema);
export const Product = mongoose.model("Product", productSchema);

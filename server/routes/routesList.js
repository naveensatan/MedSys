import { SignUpRoute } from "./signupRoute.js";
import { LoginRoute } from "./loginRoute.js";
import { AddProductRoute } from "./addProductRoute.js";
import { UserRoute } from "./usersRoute.js";
import { DeleteUserRoute } from "./deleteUserRoute.js";
import { GetUserRoute } from "./getUserRoute.js";
import { UpdateUserRoute } from "./updateUserRoute.js";
import { ProductsRoute } from "./productsRoute.js";

export const Routes = [
	SignUpRoute,
	LoginRoute,
	AddProductRoute,
	UserRoute,
	ProductsRoute,
	DeleteUserRoute,
	GetUserRoute,
	UpdateUserRoute,
];

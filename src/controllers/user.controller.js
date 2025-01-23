import { forgotpassword } from "./USER/forgotp.js";
import { loginUser } from "./USER/login.js";
import registerUser from "./USER/register.js";
import resetUser from "./USER/resetp.js";


const userController = {
    login:loginUser,
    register:registerUser,
    reset:resetUser,
    forgot:forgotpassword,
};

export default userController;
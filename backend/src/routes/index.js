import userRoutes from "./users/index.js";
import meRoutes from "./me/index.js";
import authRoutes from "./auth/index.js";
import roleRoutes from "./roles/index.js";
import permissionRoutes from "./permissions/index.js";
import googleLoginRoutes from "./googleauth/index.js";
import mCODEKGRoutes from "./mcodekg/index.js";
import pubmedRoutes from "./pubmed/index.js";
import GoogleSignUpHandler from "../handlers/googleauth/index.js";
import GoogleSignInHandler from "../handlers/googleauth/index.js";
import SignInHandler from "../handlers/basicauth/index.js";
import SignUpHandler from "../handlers/basicauth/index.js";
import getPubmedKeywordDataHandler from "../handlers/cancerkeywords/index.js";

export {
  userRoutes,
  meRoutes,
  authRoutes,
  roleRoutes,
  permissionRoutes,
  googleLoginRoutes,
  mCODEKGRoutes,
  pubmedRoutes,
  GoogleSignUpHandler,
  GoogleSignInHandlers,
  SignInHandler,
  SignUpHandler,
  getPubmedKeywordDataHandler,
};

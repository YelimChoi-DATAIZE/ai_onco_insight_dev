import googleLoginRoutes from "./googleauth/index.js";
import mCODEKGRoutes from "./mcodekg/index.js";
import pubmedRoutes from "./pubmed/index.js";
import {
  GoogleSignInHandler,
  GoogleSignUpHandler,
} from '../handlers/googleauth/index.js';
import {
  SignInHandler,
  SignUpHandler,
} from '../handlers/basicauth/index.js';
import { getPubmedKeywordDataHandler } from "../handlers/cancerkeywords/index.js";
import { saveToGridFsHandler } from "../handlers/projectdata/index.js";

export {
  googleLoginRoutes,
  mCODEKGRoutes,
  pubmedRoutes,
  GoogleSignUpHandler,
  GoogleSignInHandler,
  SignInHandler,
  SignUpHandler,
  getPubmedKeywordDataHandler,
  saveToGridFsHandler,
};

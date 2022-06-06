import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite";
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from "react-facebook-login-lite";

// import { googleLogin } from "../../redux/actions/authAction";

const LoginSocial = () => {
  const dispatch = useDispatch();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    // dispatch(googleLogin(id_token));
  };

  return (
    <>
      <div className='auth_social'>
        <GoogleLogin
          client_id='740324844325-d3jsrbijikpeic8pi1dmrnpnsved1chf.apps.googleusercontent.com'
          cookiepolicy='single_host_origin'
          onSuccess={onSuccess}
          theme='light'
        />
      </div>
    </>
  );
};

export default LoginSocial;

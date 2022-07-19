import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import { FC } from "react"
import { GoogleIcon } from "../../icons"
import './GoogleLoginButton.scss'

type GoogleLoginButtonProps = {
  onSuccess: (tokenResponse: TokenResponse) => void
}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const login = useGoogleLogin({ onSuccess })
    
  return (
    <button className="google-login-button" onClick={() => login()}>
      <GoogleIcon />
      <span className="google-login-button-text">Sign in with Google</span>
    </button>
  )
}

export default GoogleLoginButton
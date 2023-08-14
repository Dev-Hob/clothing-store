import { signInWithGooglePopup, create_user_document_from_auth } from "../../../utils/firebase/firebase.utils"

export default function SignIn() {

  const logInWithGoogle = async() => {
    const {user} = await signInWithGooglePopup()
    console.log(user)
    create_user_document_from_auth(user);
  } 

  return (
    <div>
    <h1>Sign In Page</h1>
    <button onClick={logInWithGoogle}>Sign In with Google</button>
    </div>
  )
}

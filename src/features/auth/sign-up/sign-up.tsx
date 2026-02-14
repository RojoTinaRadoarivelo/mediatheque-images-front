import "./sign-up.scss";

function SignUp() {
  return (
    <div className="w-full flex flex-col items-center my-2 px-2 bg-white z-50">
      Sign Up
      <form>
        <input type="email" name="userEmail" id="userEmail" />
        <input type="password" name="userPwd" id="userPwd" />
        <input type="text" />
      </form>
    </div>
  );
}

export default SignUp;

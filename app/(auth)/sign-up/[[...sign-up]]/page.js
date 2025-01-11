import { SignIn, SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="h-screen flex-center">
      <SignUp />
    </div>
  );
};

export default SignUpPage;

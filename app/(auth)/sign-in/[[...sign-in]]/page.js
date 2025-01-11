import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="h-screen flex-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;

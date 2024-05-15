import { AuthForm } from "@/components/Auth/AuthForm";
import { MaxWidthWrapper } from "@/components/HomePage/MaxWidthWrapper";

const SignIn = () => {
  return (
    <div>
      <MaxWidthWrapper>
        <AuthForm type="sign-in" />
      </MaxWidthWrapper>
    </div>
  );
};

export default SignIn;

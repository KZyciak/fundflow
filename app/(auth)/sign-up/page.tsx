import { AuthForm } from "@/components/Auth/AuthForm";
import { MaxWidthWrapper } from "@/components/HomePage/MaxWidthWrapper";

const SignUp = async () => {
  return (
    <div className="">
      <MaxWidthWrapper>
        <AuthForm type="sign-up" />
      </MaxWidthWrapper>
    </div>
  );
};

export default SignUp;

import { SignupFormDemo } from "@/components/ui/signup-form";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
        <SignupFormDemo />
      </div>
    </div>
  );
};

export default SignUpPage;

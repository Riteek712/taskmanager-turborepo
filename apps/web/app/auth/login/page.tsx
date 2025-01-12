import { LoginFormDemo } from "@/components/ui/login-form";

const LogInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-bold mb-4">Log in page</h1>
        <LoginFormDemo />
      </div>
    </div>
  );
};

export default LogInPage;

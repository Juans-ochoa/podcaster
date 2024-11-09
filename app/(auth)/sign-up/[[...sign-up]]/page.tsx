import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <section className="flex-center glassmorphism-auth h-screen w-full">
      <SignUp />
    </section>
  );
};

export default SignUpPage;

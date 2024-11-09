import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <section className="flex-center glassmorphism-auth h-screen w-full">
      <SignIn />
    </section>
  );
};

export default SignInPage;

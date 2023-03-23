import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { signIn, SignInResponse, getProviders } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

import { FormInput } from "@/components/Form";
import { customToast } from "@/components/Toast";

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password length must be more than 6 characters")
    .max(20, "Password length cannnot exceed 20 characters"),
}).required();


const SignIn: NextPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setIsBtnLoading(true);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

console.log("res: ", res)

    const { ok, error } = res as SignInResponse;

    if (ok) {
      router.push("/cart");
      setTimeout(() => {
        setIsBtnLoading(false);
      }, 4000);

    } else {
      setIsBtnLoading(false);

      switch (error) {
        case "fetch failed":
          console.log("fetch failed")
          customToast("error", "Sign in failed. Please make sure you're connected to the internet", "top-right");
          break;
        case "CredentialsSignin":
          console.log("credential sinin")
          customToast("error", "Invalid email and/or password", "top-right");
          break;

        default:
          console.log("sign in failed")
          customToast("error", "Sign in attempt failed! Please try again later.", "top-right")
          break;
      }
    }

  }

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }


  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Signin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />
      <div className="flex flex-col items-center w-full h-screen">
        <div className="mt-10 max-w-md p-2 border-2">
          <div className="">
            <header className="text-lg font-bold text-[color:var(--primary-color)] text-center">FemaleSuave</header>
            <p className="">Please, enter your email address and password to sign in.</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <div className="">
              <FormInput
                htmlFor="email"
                title="Email"
                type="email"
                name="email"
                placeholder="Email"
                register={register("email")}
                errors={errors.email?.message}
                data_testid=""
              />
            </div>

            <div className="relative">
              <div className="">
                <FormInput
                  htmlFor="password"
                  title="Password"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  register={register("password")}
                  errors={errors.password?.message}
                  data_testid=""
                />
                <span
                  className="absolute top-9 right-4 text-orange-500"
                  onClick={handleTogglePassword}
                >
                  {isPasswordVisible ?
                    <AiFillEyeInvisible size={18} /> :
                    <AiFillEye size={18} />
                  }
                </span>
              </div>
              <div>
                <Link href="/forgot-password">Forgot password?</Link>
                <p>Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link></p>
              </div>
            </div>
            <input
              type="submit"
              // role="button"
              className="{!isBtnLoading ? styles.login_btn : styles.login_btn_loading}"
              value={!isBtnLoading ? "Sign in" : "Signing in..."}
            />
          </form>
        </div>
      </div>

    </>
  );
}


// To implement providers

// export const getServerSideProps: GetServerSideProps<any> = async (context) => {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   // If sign in is successful, redirect to homepage
//   if (session) {
//     return {
//       redirect: { destination: "/", permanent: false },
//     };
//   }

//   const providers = await getProviders(context);
//   return {
//     props: { providers },
//   };
// }


export default SignIn;
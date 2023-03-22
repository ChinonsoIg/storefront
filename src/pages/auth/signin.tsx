import { useState } from "react";
import { signIn, getProviders } from "next-auth/react";

import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillFacebook, AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Link from "next/link";
// import { customToast } from "../../components/Toasts";
// import { FormWithValidation } from "../../components/Form";


const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password length must be more than 6 characters")
    .max(20, "Password length cannnot exceed 20 characters"),
}).required();

const SignIn = ({ providers }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setIsBtnLoading(true);
    console.log("data: ", data.email, data.password)

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    const { ok, error } = res;

    if (ok) {
      router.push("/");
      setTimeout(() => {
        setIsBtnLoading(false);
      }, 4000);

    } else {
      setIsBtnLoading(false);

      switch (error) {
        case "fetch failed":
          console.log("fetch failed")
          // customToast("error", "Sign in failed. Please make sure you're connected to the internet", "top-right");
          break;
        case "CredentialsSignin":
          console.log("credential sinin")
          // customToast("error", "Invalid email and/or password", "top-right");
          break;

        default:
          console.log("sign in failed")
          // customToast("error", "Sign in attempt failed! Please try again later.", "top-right")
          break;
      }
    }

  }

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword)
  }


  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Signin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ToastContainer /> */}
      <div className="">
        <div className="{styles.auth_form_box}">
          <div className="{styles.title_box}">
            <header className="">Welcome!</header>
            <p className="">Enter details to sign in.</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <div className="">
              {/* <FormWithValidation
                htmlFor="email"
                title="Email"
                type="email"
                name="email"
                placeholder="Email"
                register={register("email")}
                errors={errors.email?.message}
              // data_testid="signin-email"
              /> */}
              <input
              type="text"
              placeholder="Email"
              className="my-2"
              {...register("email")}
              name="email"
              />
              <br />
              <input
              type="password"
              placeholder="Email"
              className="my-2"
              {...register("password")}
              name="password"
              />
              <div className="">
                {/* <FormWithValidation
                  htmlFor="password"
                  title="Password"
                  type={togglePassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  register={register("password")}
                  errors={errors.password?.message}
                // data_testid="signin-password"
                /> */}
                <span className="{styles.password_hide_show}" onClick={handleTogglePassword}>{togglePassword ? "hide" : "show"}</span>
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



export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If sign in is successful, redirect to homepage
  if (session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  const providers = await getProviders(context);
  return {
    props: { providers },
  };
}


export default SignIn;
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading } from "react-icons/ai";

import { useDispatch } from "react-redux";

import { login } from "../config/httpRequests";
import { setAuth } from "../redux/features/Auth";
import Image_Logo from "../assets/traiteurLogoWithText.png";
import Image_Banner from "../assets/loginBannerTraiteur.png";

const LoginForm = () => {
  /** @type {{token: string | null, loggedIn: boolean, lastLogin: EpochTimeStamp}} */
  const dispatch = useDispatch();

  const navigation = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => setPasswordVisible((prev) => !prev);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleError = (error) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 3_500);
  };

  const onSubmit = async (credentials) => {
    setLoading(true);
    // const { username, password } = credentials;
    const { token } = await login(credentials);
    if (!!token) {
      const payload = {
        token: token,
        lastLogin: Date.now(),
        loggedIn: true,
      };
      dispatch(setAuth(payload));
      localStorage.setItem("sessionToken", token);
      navigation("/", { replace: true });
    } else handleError("Informations d'identification incorrectes.");
    // const { message, token } = await login(credentials);

    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full px-8 py-16 gap-8 flex-1">
      <img src={Image_Logo} className="w-[268px]" />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold font-open-sans text-strong-contrast">Connexion</h1>
        <h3 className="text-base font-open-sans text-gray-400">Entrez vos informations de connexion pour accéder à votre compte</h3>
      </div>
      <div className="flex flex-col gap-4 text-strong-contrast">
        <label className="text-lg font-asap font-semibold text-strong-contrast" htmlFor="username">Nom de l'utilisateur</label>
        <input {...register("username")} className="rounded-xl border border-weak-contrast/50 border-b-4 border-b-[#E5935B] p-4 bg-transparent font-open-sans placeholder:font-light" type="text" name="username" id="username" placeholder="Entrez votre nom d'utilisateur" />
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-lg font-asap font-semibold text-strong-contrast" htmlFor="password">Mot de passe</label>
        <div className="relative w-full text-strong-contrast">
          <input {...register("password")} className="rounded-xl border border-weak-contrast/50 p-4 bg-transparent font-open-sans placeholder:font-light w-full pr-12" type={passwordVisible ? "text" : "password"} name="password" id="password" placeholder="Entrez votre mot de passe" />
          {passwordVisible ?
            <AiFillEye onClick={togglePasswordVisible} className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl cursor-pointer" />
            :
            <AiFillEyeInvisible onClick={togglePasswordVisible} className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl cursor-pointer" />
          }
        </div>
      </div>
      <Link to="/account_recovery" className="text-sm text-gray-600 font-asap ml-auto">Mot de passe oublié ?</Link>
      {loading
        ? (
          <button className="disabled text-2xl text-highlight font-asap p-4 rounded-xl flex justify-center items-center" disabled type="submit">
            <AiOutlineLoading className="animate-spin" />
          </button>
        )
        : (
          <button className="text-xl bg-highlight text-gray-100 font-asap p-4 rounded-xl hover:bg-highlight" type="submit">Login</button>
        )
      }
      {
        error &&
        (
          <div className="w-full h-fit p-2 bg-red-200 rounded-md">
            <p className="text-sm text-red-900">{error}</p>
          </div>
        )
      }
    </form>
  )
}

const Login = () => {
  // TODO: Autocomplete overrides color.
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-secondary flex">
      <LoginForm />
      <div className="flex relative h-full flex-[2_2_0%]">
        <div className="flex-1 h-full bg-secondary"></div>
        <div className="flex-1 h-full bg-strong-contrast"></div>
        <img src={Image_Banner} className="absolute top-1/2 -translate-y-1/2 h-[92.5%]" />
      </div>
    </div>
  )
};

export default Login;

import { useState } from "react";
import axios from "./config/axios";

import { useAuth } from "./hooks/use-auth";

export default function LoginFeaturePage() {
  const { login, errLogin } = useAuth();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitForn = async (e) => {
    e.preventDefault();
    login(input)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleRegister = async () => {
    await axios.post("/admin/registerAdmin");
  };

  return (
    <form className="w-screen h-screen  flex justify-center items-center">
      <div className="w-2/3 h-2/3  flex justify-center items-center">
        <div className="">
          <div className="flex items-center justify-center">
            <img className="w-56 h-56  " src={"public/Group 461.svg"} alt="" />
          </div>
          <div className=" text-2xl text-red-600">
            {errLogin ? "The account was not found." : ""}
          </div>
          <div className=" flex justify-center p-1">
            <div>
              <div>Username</div>
              <input
                className="bg-yellow-600 p-2 border rounded-md text-white w-64 font-semibold"
                name="username"
                value={input.username}
                onChange={handleChangeInput}
                type="text"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <div>Password</div>
              <input
                className="bg-yellow-600 p-2 border rounded-md text-white w-64 font-extrabold"
                name="password"
                value={input.password}
                onChange={handleChangeInput}
                type="password"
              />
            </div>
          </div>
          <div className="flex gap-5 m-5  items-center justify-center">
            <button
              onClick={handleSubmitForn}
              className="bg-black text-white pl-8 pr-8 p-1 rounded-md "
            >
              login
            </button>
            {/* <button
              onClick={handleRegister}
              className="bg-black text-white pl-8 pr-8 p-1 rounded-md"
            >
              Register
            </button> */}
          </div>
          <footer className=" translate-y-1 flex gap-2">
            <div>© 2024 Gemicks Label | Created by</div>
            <a className="underline" href="https://meworx.me/">
              MEWorx
            </a>
          </footer>
        </div>
      </div>
    </form>
  );
}

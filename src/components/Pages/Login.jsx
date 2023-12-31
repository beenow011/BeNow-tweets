import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import authService from "../../appwite/auth";
import logo from "../../assets/logo2.png";

export default function LoginCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState(true);

  const { register, handleSubmit } = useForm();
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        localStorage.setItem("appwriteToken", session.$id);
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          // console.log(userData);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Card className="w-80 md:w-96 mx-auto my-32 bg-[#ec5990]">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Log in
        </Typography>
      </CardHeader>
      <img src={logo} alt="logo" width={100} className="m-auto" />

      <CardBody className="flex flex-col gap-4 ">
        <Input
          label="Email"
          size="lg"
          color="black"
          className="text-black"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <div>
          <Input
            label="Password"
            type={visibility ? "password" : "text"}
            size="lg"
            color="black"
            className="text-black"
            {...register("password", {
              required: true,
            })}
          />
          <span
            className="material-symbols-outlined absolute right-[32px] top-[298px] cursor-default"
            onClick={() => setVisibility((state) => !state)}
          >
            {visibility ? "visibility_off" : "visibility"}
          </span>
        </div>
      </CardBody>
      <CardFooter className="pt-0" as="div">
        {error && (
          <p className="text-red-500 bg-white m-1 rounded-md text-center">
            {error}
          </p>
        )}
        <Button variant="gradient" fullWidth onClick={handleSubmit(login)}>
          Log in
        </Button>
        <Typography
          variant="small"
          className="mt-6 flex justify-center"
          as="div"
        >
          Don&apos;t have an account?
          <Typography
            as="div"
            variant="small"
            color="black"
            className="ml-1 font-bold cursor-pointer"
          >
            <Link to="/signup"> Sign up</Link>
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}

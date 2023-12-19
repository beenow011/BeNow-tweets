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
import { login } from "../../store/authSlice";
import authService from "../../appwite/auth";

export default function LoginCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        await authService.getCurrentUser();
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Card className="w-96 mx-auto my-32 bg-[#ec5990]">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 ">
        <Input
          label="Name"
          size="lg"
          className="text-black"
          {...register("name", {
            required: true,
          })}
        />

        <Input
          label="Email"
          size="lg"
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
        <Input
          label="Password"
          type="password"
          size="lg"
          className="text-black"
          {...register("password", {
            required: true,
          })}
        />
      </CardBody>
      <CardFooter className="pt-0" as="div">
        {error && (
          <p className="text-red-500 bg-white m-1 rounded-md text-center">
            {error}
          </p>
        )}
        <Button variant="gradient" fullWidth onClick={handleSubmit(create)}>
          Sign Up
        </Button>
        <Typography
          variant="small"
          className="mt-6 flex justify-center"
          as="div"
        >
          already have an account?
          <Typography
            as="div"
            variant="small"
            color="black"
            className="ml-1 font-bold cursor-pointer"
          >
            <Link to="/login">Log in</Link>
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}

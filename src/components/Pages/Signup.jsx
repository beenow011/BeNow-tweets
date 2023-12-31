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
import service from "../../appwite/config";

export default function LoginCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(true);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [File, setFile] = useState("");
  const uploadFile = async (file) => {
    setError("");
    try {
      // console.log(file[0]);

      const newfile = await service.uploadFile(file[0]);
      return newfile;
    } catch (error) {
      setError(error.message);
    }
  };
  const bio = "write your bio";
  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        // const newfile = await authService.getCurrentUser();

        const userData = await authService.getCurrentUser();
        if (userData) {
          localStorage.setItem("appwriteToken", userData.$id);

          const newFile = await uploadFile(data.image);
          const fileId = newFile.$id;
          console.log(fileId);
          const updatedPref = await authService.updateUser({ fileId, bio });
          console.log(updatedPref);
          dispatch(login(updatedPref));
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
        <div>
          <Input
            label="Password"
            type={visibility ? "password" : "text"}
            size="lg"
            className="text-black"
            {...register("password", {
              required: true,
            })}
          />{" "}
          <span
            className="material-symbols-outlined absolute right-[32px] top-[258px] cursor-default"
            onClick={() => setVisibility((state) => !state)}
          >
            {visibility ? "visibility_off" : "visibility"}
          </span>
        </div>
        <Input
          label="Profil pic"
          type="file"
          size="lg"
          color="black"
          className="text-black"
          {...register("image", {
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

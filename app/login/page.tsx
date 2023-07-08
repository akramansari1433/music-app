"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center my-10">
                <div className="h-80 w-80 flex justify-center items-center bg-gradient-to-r from-blue-500 to-red-500 rounded-xl">
                    <h1 className="text-white text-4xl font-bold font-mono">
                        Music App
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col my-5"
                >
                    <input
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                maxLength: (v) =>
                                    v.length <= 50 ||
                                    "The email should have at most 50 characters",
                                matchPattern: (v) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                        v
                                    ) ||
                                    "Email address must be a valid address",
                            },
                        })}
                        className="w-80 rounded-md py-3 px-3"
                        placeholder="Email"
                    />
                    {errors.email?.message && (
                        <small className="text-red-500 mt-1">
                            {errors.email.message}
                        </small>
                    )}
                    <input
                        {...register("password", {
                            required: "Password is required",
                            validate: {
                                minLength: (v) =>
                                    v.length >= 8 ||
                                    "The password should have at least 8 characters",
                            },
                        })}
                        className="mt-6 w-80 rounded-md py-3 px-3"
                        placeholder="Password"
                        type="password"
                    />
                    {errors.password?.message && (
                        <small className="text-red-500 mt-1">
                            {errors.password.message}
                        </small>
                    )}
                    <button
                        type="submit"
                        className="mt-6 mx-auto bg-blue-700 text-white px-5 py-2 rounded-md"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

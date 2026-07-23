import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {login as authLogin} from '../store/authSlice';
import {Button, Input, Logo} from "./index";
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import {useForm} from "react-hook-form";

function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] =useState("");
    
    const login=async(data)=>{
        setError("");
        try {
            const session=await authService.login(data);
            if(session){
                const userData=await authService.
                getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='flex item-center justify-center w-full p-11'>
        <div className={`mx-auto w-full max-w-lg bg-green-100 rounded-xl p-10 border-black`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-\[100px]'>
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Sign in to your account
            </h2>
            <p className='mt-2 text-center text-base text-black'>
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className='font-medium text-primart transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {error&&<p className="text-red-6600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)}className="mt-8">
                <Input
                    label="Email: "
                    placeholder='Enter your email'
                    type='email'
                    {...register("email", {
                        required:true,
                        validate:{
                            matchPatern:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value)||"Email address must be a valid address",
                        }
                    })}
                />
                <Input
                    label='Password'
                    type="password"
                    placeholder="Enter Password"
                    {...register("password",{
                        required:true,
                    })}
                />
                <button
                    type='submit'
                    className='w-full'
                >Sign in</button>
            </form>
        </div>
    </div>
  )
}

export default Login
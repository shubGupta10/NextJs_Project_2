'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

  const router = useRouter();
  const [data, setData] = useState("");


  const getUserDetails = async ()=> {
    const res = await axios.post("/api/users/me")
    console.log(res.data.data);
    setData(res.data.data._id);
    localStorage.setItem('userId', res.data.data._id);
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className="p-1 rounded bg-green-500">{data === '' ? "" : <Link href={`/profile/${data}`}>{data}
        </Link>}</h2>
    <hr />
    <button
    onClick={logout}
    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >Logout</button>

    <button
    onClick={getUserDetails}
    className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >GetUser Details</button>


        </div>
)
}

export default page
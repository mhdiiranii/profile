'use client'

import ApiCaller from "@/services/Api";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const MyProfile = () => {


    const [disabled,setDisabled] = useState(true)
    const [data,setData]=useState()
    const pathname = usePathname()
    const myUser = pathname.slice(9)
    const [emile,setEmile] = useState('');
    const [name , setName ] = useState('');
    const [lastName , setLastName ] = useState('');
    const [number , setNumber ] = useState('');
    const [error,setError] = useState (false)


    useEffect(()=>{
        ApiCaller().getUser()
            .then((item)=> setData(item.data))
    },[])
    useEffect(()=>{
        data?.filter((item)=>item.id == myUser).map((item)=>{
            setEmile(item.emile)
            setName(item.name)
            setLastName(item.lastName)
            setNumber(item.number)
        })
    },[data])

    const clickOnEddit =()=>{
        if(disabled){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }

    function isValidEmail(e) {
        return /\S+@\S+\.\S+/.test(e);
      }

    const clickOnOK = ()=>{
        if(isValidEmail(emile)  && name.length >= 1  && lastName .length >= 1 && number.length >= 11){
            setDisabled(true)
            setError(false)
            ApiCaller().edditUser(
                myUser,
                {
                    emile:emile,
                    name:name,
                    lastName:lastName,
                    number:number,
                    loge:false
                }
        )
        }else{
            setError(true)
        }
    }

    const clickOnCancel = ()=>{
        setDisabled(true)
        setError(false)
        data?.filter((item)=>item.id == myUser).map((item)=>{
            setEmile(item.emile)
            setName(item.name)
            setLastName(item.lastName)
            setNumber(item.number)
        })
    }

    return ( 
        <div className="flex justify-center items-center h-screen">
            {/* {data?.filter((item)=>item.id == myUser).map((item)=>(
                <div 
                    key={item.id} 
                    className="w-1/3 border p-4 shadow-lg rounded-md"
                    >
                    <div className="flex flex-col px-4 gap-4 justify-start items-center">
                        <div className="flex w-full items-center gap-4 justify-between">
                            <p>
                                Emile
                            </p>
                            <input 
                                disabled={disabled} 
                                onChange={(e)=> setEmile(e.target.value)}
                                className="bg-blue-200 disabled:shadow-[inset_0_0px_5px_rgba(0,0,0,0.5)] outline-none p-2 rounded-md" 
                                value={item.emile}
                            />
                        </div>
                        <div className="flex w-full items-center gap-4 justify-between">
                            <p>
                                Name
                            </p>
                            <input 
                                disabled={disabled} 
                                onChange={(e)=> setName(e.target.value)}
                                className="bg-blue-200 disabled:shadow-[inset_0_0px_5px_rgba(0,0,0,0.5)] outline-none p-2 rounded-md" 
                                value={item.name}
                            />
                        </div>
                        <div className="flex w-full items-center gap-4 justify-between">
                            <p>
                                Lsat Name
                            </p>
                            <input 
                                disabled={disabled} 
                                onChange={(e)=> setLastName(e.target.value)}
                                className="bg-blue-200 disabled:shadow-[inset_0_0px_5px_rgba(0,0,0,0.5)] outline-none p-2 rounded-md" 
                                value={item.lastName}
                            />
                        </div>
                        <div className="flex w-full items-center gap-4 justify-between">
                            <p>
                                Number
                            </p>
                            <input 
                                disabled={disabled} 
                                onChange={(e)=> setNumber(e.target.value)}
                                className="bg-blue-200 disabled:shadow-[inset_0_0px_5px_rgba(0,0,0,0.5)] outline-none p-2 rounded-md" 
                                value={item.number}
                            />
                        </div>
                        <div className="mt-5">
                            {disabled ? 
                            (
                                <button
                                onClick={clickOnEddit} 
                                className="px-4 py-2 bg-green-300 rounded-md"
                            >
                                Eddit
                            </button>
                            )
                            :
                            (
                            <div className="flex gap-5">
                                    <button
                                        onClick={clickOnOK} 
                                        className="px-4 py-2 bg-green-300 rounded-md"
                                    >
                                        Ok
                                    </button>
                                    <button
                                        onClick={(clickOnCancel)} 
                                        className="px-4 py-2 bg-green-300 rounded-md"
                                    >
                                        Cancel
                                    </button>
                            </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            ))

            } */}
            <div 
                    
                    className="w-1/3 border p-4 text-center shadow-lg rounded-md"
                    >
                    <h1 className="capitalize text-lg font-semibold mb-5">
                        your profile
                    </h1>
                    <div className="flex flex-col px-4 gap-4 justify-start items-center">
                        <div className="flex w-full items-center gap-4 justify-between">
                            <p>
                                Emile
                            </p>
                            <input 
                                disabled={disabled} 
                                onChange={(e)=> setEmile(e.target.value)}
                                className={`${error&& 'border border-red-400'} bg-blue-200 disabled:shadow-[inset_0_0px_5px_rgba(0,0,0,0.5)] outline-none p-2 rounded-md`} 
                                value={emile}
                            />
                        </div>
                        <div className="flex w-full items-center gap-4 justify-between">
                            <p>
                                Name
                            </p>
                            <input 
                                disabled={disabled} 
                                onChange={(e)=> setName(e.target.value)}
                                className={`${error&& 'border border-red-400'} bg-blue-200 disabled:shadow-[inset_0_0px_5px_rgba(0,0,0,0.5)] outline-none p-2 rounded-md`}
                                value={name}
                            />
                        </div>
                        <div className="flex w-full items-center gap-4 justify-between">
                            <p>
                                Lsat Name
                            </p>
                            <input 
                                disabled={disabled} 
                                onChange={(e)=> setLastName(e.target.value)}
                                className={`${error&& 'border border-red-400'} bg-blue-200 disabled:shadow-[inset_0_0px_5px_rgba(0,0,0,0.5)] outline-none p-2 rounded-md`}
                                value={lastName}
                            />
                        </div>
                        <div className="flex w-full items-center gap-4 justify-between">
                            <p>
                                Number
                            </p>
                            <input 
                                disabled={disabled} 
                                onChange={(e)=> setNumber(e.target.value)}
                                className={`${error&& 'border border-red-400'} bg-blue-200 disabled:shadow-[inset_0_0px_5px_rgba(0,0,0,0.5)] outline-none p-2 rounded-md`} 
                                value={number}
                            />
                        </div>
                        <div className="mt-5">
                            {disabled ? 
                            (
                                <button
                                onClick={clickOnEddit} 
                                className="px-4 py-2 bg-green-300 rounded-md"
                            >
                                Eddit
                            </button>
                            )
                            :
                            (
                            <div className="flex gap-5">
                                    <button
                                        onClick={clickOnOK} 
                                        className="px-4 py-2 bg-green-300 rounded-md"
                                    >
                                        Ok
                                    </button>
                                    <button
                                        onClick={(clickOnCancel)} 
                                        className="px-4 py-2 bg-green-300 rounded-md"
                                    >
                                        Cancel
                                    </button>
                            </div>
                            )
                            }
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
export default MyProfile;
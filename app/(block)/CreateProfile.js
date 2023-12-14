'use client'
import ApiCaller from "@/services/Api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateProfile = () => {

    const [emile,setEmile] = useState('');
    const [name , setName ] = useState('');
    const [lastName , setLastName ] = useState('');
    const [number , setNumber ] = useState('');
    const [check,setCheck] = useState(false);
    const [error ,setError] = useState(null);
    const [data,setData] = useState()
    const [id,setId] = useState()

    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const router = useRouter()

    useEffect(()=>{
        if(isValidEmail(emile)  && name.length >= 1  && lastName .length >= 1 && number.length >= 11){
            setCheck(true)
        }else{
            setCheck(false)
        }
    })

    console.log(check);

    useEffect(()=>{
        
        ApiCaller().getUser().then(item=>{setData(item.data),setId(item.data.length+1)})
    },[])

    function isValidEmail(e) {
        return /\S+@\S+\.\S+/.test(e);
      }
    
    
    const createProfile = async(e)=>{
        e.preventDefault();
        if(check){
            setError(false)
            await ApiCaller().newUser({
                emile:emile,
                name:name,
                lastName:lastName,
                number:number,
                loge:false
            })
            setCheck(false)
            router.push(`profile/${id}`)
        }else{
            setError(true)
        };
    }

    return ( 
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <form action="/profile"  className="w-1/3 flex shadow-md flex-col justify-between items-center gap-10 border p-10">
                <h1 className="text-4xl font-semibold">Form</h1>
                <div className="flex w-full justify-between gap-5 items-center">
                    <label>
                        Emile
                    </label>
                    <input 
                        onChange={(e)=>setEmile(e.target.value)}
                        className={`${error&& 'border border-red-400'} bg-blue-100 rounded-md outline-none px-4 py-2`}
                    />
                </div>
                <div className="flex w-full justify-between gap-5 items-center">
                    <label>
                        Name
                    </label>
                    <input 
                        onChange={(e)=>setName(e.target.value)}
                        className={`${error&& 'border border-red-400'} bg-blue-100 rounded-md outline-none px-4 py-2`}
                    />
                </div>
                <div className="flex w-full justify-between gap-5 items-center">
                    <label>
                        Last Name
                    </label>
                    <input
                        onChange={(e)=>setLastName(e.target.value)} 
                        className={`${error&& 'border border-red-400'} bg-blue-100 rounded-md outline-none px-4 py-2`}
                    />
                </div>
                <div className="flex w-full justify-between gap-5 items-center">
                    <label>
                        Number
                    </label>
                    <input 
                        type="number"
                        onChange={(e)=>setNumber(e.target.value)}
                        className={`${error&& 'border border-red-400'} bg-blue-100 rounded-md outline-none px-4 py-2`}
                    />
                </div>
                <div>
                    <button onClick={(e)=> createProfile(e)} className={` ${!error&&'mt-10'}  px-6  py-2 bg-green-400 text-lg  rounded-md hover:drop-shadow-lg`}> 
                        create
                    </button>
                </div>
            </form>
        </div>
     );
}
 
export default CreateProfile;
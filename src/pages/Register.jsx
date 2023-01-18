import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from  'styled-components';
import Logo from '../assets/Logo.png';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRouter } from '../utils/APIRouter';
function Register() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {password, username, email} = values;
            const{data} = await axios.post(registerRouter,{
                username,
                email,
                password,
            }); 
            if(data.status === false){
                toast.error(data.msg,toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate("/");
            }
          
        };
    };
    const handleValidation = () =>{
        const {password,confirmPassword,username,email} = values;
        if(password !== confirmPassword){
            toast.error("Hai mật khẩu không trùng khớp",toastOptions);
            return false;
        }else if(username.length <3){
            toast.error("Họ & Tên lớn hơn 3 ký tự",toastOptions);
            return false;
        }else if(password.length <6){
            toast.error("Mật khẩu lớn hơn 6 ký tự",toastOptions);
            return false;
        }else if(email ===""){
            toast.error("Email để trống",toastOptions);
            return false;
        }
        return true
    }
    const handleChange= (event)=>{
        setValues({...values,[event.target.name]:event.target.value}); 
    };
    return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="brand">
                <img src ={Logo} alt="Logo"/>
                <h1>Snapp</h1>
            </div>
            <input type="text" placeholder='UserName' name="username" onChange={(e)=>handleChange(e)}/>
            <input type="email" placeholder='Email' name="email" onChange={(e)=>handleChange(e)}/>
            <input type="password" placeholder='Password' name="password" onChange={(e)=>handleChange(e)}/>
            <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={(e)=>handleChange(e)}/>
            <button type="submit">Đăng ký tài khoản</button>
            <span>Bạn đã có tài khoản ? <Link to="/dang-nhap">ĐĂNG NHẬP</Link></span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}
const FormContainer =  styled.div`
    height: 100vh;
    width: 100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
        display:flex;
        align-items: center;
        gap:1rem;
        justify-content: center;
        img{
            height:5rem;
        }
        h1{
            color:white;
            text-transfrom: uppercase;
        }
    }
    form{
        display:flex;
        flex-direction: column;
        gap: 2rem;
        background-color:#00000076;
        border-radius:2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color:white;
            width: 100%;
            font-size:1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline:none;
            }
        }
        button{
            background-color: #997af0;
            color:white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor:pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{
            color:white;
            text-transform: uppercase;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }
`;
export default Register
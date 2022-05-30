
import { useState } from 'react';
import apiClient from '../helpers/apiClient'
import { useNavigate  } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = async(event)=>{
    event.preventDefault();
   const {data} = await apiClient.post('auth/login', {email:email, password:password})
    localStorage.setItem('token', data.accessToken)
    const currentUser = await apiClient.get('auth/get-profile');
    localStorage.setItem('user', JSON.stringify(currentUser.data));
    navigate("/home")
  }  
  return (
    <section className="">
        <div className="container">
            <div className="maxwidth-420">
                <div className="login-wrap">
                    <div className="heading-title text-left m-b-0">
                        <h2 className="m-b-5">Login</h2>                           
                    </div>
                    <div className="form-wrapper ">
                        <form onSubmit={handleSubmit}>
                            <div className="form-inner">
                                <div className="grid-row">
                                    <div className="grid-12">
                                        <div className="input-field">
                                            <label className="">Email Address</label>
                                            <input className="" type="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="grid-12">
                                        <div className="input-field">
                                            <div className="input-field">
                                                <label className="">Password</label>
                                                <input className="" type="password" value={password}
                                                    onChange={(e) => setPassword(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                    
                            </div>
                            <div className="submit-button p-t-5">
                                <input type="submit" value="Login " className="theme-btn"/>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}

export default LoginPage;


import { useEffect, useState } from 'react';
import apiClient from '../helpers/apiClient'
import { useNavigate  } from "react-router-dom";
function LoginPage() {
    const navigate = useNavigate ();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = async(event)=>{
    event.preventDefault();
   const {data} = await apiClient.post('auth/login', {email:email, password:password})
    localStorage.setItem('token', data.accessToken)
    navigate("/users")
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
                                <div className="validation-message error-found">Error Message</div>
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
                        <div className="other-links">
                            <a href="javascript:void(0)" className="anchorunderline">Forgot your password?</a>
                            <p>Don’t have an account?</p>
                            <a href="javascript:void(0)" className="black-transparent-btn createaccount">Create an Account</a>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}

export default LoginPage;

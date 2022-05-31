
import { useState } from 'react';
import apiClient from '../helpers/apiClient';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

function CreateCron() {
    const navigate = useNavigate();
    const [jobName, setJobName] = useState("");
    const [timeString, setTimeString] = useState("");
    const [jobQuery, setJobQuery] = useState("");

    const handleSubmit = async(event)=>{
        event.preventDefault();
       const {data} = await apiClient.post('cron/create', { name: jobName, cronString:timeString, cronQuery: jobQuery})
        console.log(data);
        navigate("/crons")
      }  

    return (
        <div className="main-wrapp">
            <Navbar/>
            <div className="content-wrap">
            <section className="section-space">
          <div className="heading-title text-left">
            <h2>Create New Cron Job</h2>
            <h3>[ Only Admin role can create a new Cron job ] </h3>
          </div>
          <div className="form_wrapper">
            <div className="maxwidth-600">
              <form onSubmit={handleSubmit}>
                <div className="grid-row">
                  <div className="grid-6">
                    <div className="record-item">
                      <div className="input-field w-100">
                        <label className="">Job Name</label>
                        <input className="" type="text" placeholder="job name" value={jobName} 
                            onChange={(e) => setJobName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid-6">
                    <div className="record-item">
                      <div className="input-field w-100">
                        <label className="">Cron time String</label>
                        <input className="" type="text" placeholder="schedule string" value={timeString}
                            onChange={(e) => setTimeString(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid-12">
                    <div className="record-item">
                      <div className="input-field w-100">
                        <label className="">Query</label>
                        <textarea placeholder="query" value={jobQuery} 
                            onChange={(e) => setJobQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-center">
                  <div className="submit-button p-t-5">
                                <input type="submit" value="Create Job " className="theme-btn"/>
                            </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
            </div>
        </div>
    );
}

export default CreateCron;

// user don't know about parameters [complete validation with drop downs]
// need to start jobs on server restart
// complete cruds
// frontend validation for query
// dropdown for function execution
// function lists

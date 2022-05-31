import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import apiClient from '../helpers/apiClient'

function CronPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const permissionsCheck = ["manage", "update"];
    const allowed = permissionsCheck.some((el) => user.permissions.includes(el));
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            const { data } = await apiClient.get('cron/list-all')
            setJobs(data)
        }
        fetchJobs();
    }, []);

    const stopJob = async (id) => {
        const { data } = await apiClient.patch(`cron/stop-job/${id}`);
        console.log(data, "testing -->")
        if (data.id) {
            const newJobArray = jobs.map(job => {
                if (job.id === id) {
                    job.status = 'stopped'
                }
                return job;
            });
            setJobs(newJobArray);
        }

    };

    const startJob = async (id) => {
        const { data } = await apiClient.patch(`cron/start-job/${id}`);
        if (data.id) {
            const newJobArray = jobs.map(job => {
                if (job.id === id) {
                    job.status = 'running'
                }
                return job;
            });
            setJobs(newJobArray);
        }

    };
    return (
        <div className="main-wrapp">
            <Navbar />
            <div className="content-wrap">
                <section className="section-space">
                    <div className="heading-title text-left">
                        <h2>Cron Jobs</h2>
                        <h3>[ All users can view this page, users with update permissions can start or stop the job ]</h3>
                    </div>
                    <div className="table-wrapper">
                        <table className="responsive-table">
                            <thead className="responsive-table__head">
                                <tr className="responsive-table__row">
                                    <th className="responsive-table__head__title responsive-table__head__title--name">
                                        Job Name
                                    </th>
                                    <th className="responsive-table__head__title responsive-table__head__title--email">
                                        Time String
                                    </th>
                                    <th className="responsive-table__head__title responsive-table__head__title--role">
                                        Job Query
                                    </th>
                                    <th className="responsive-table__head__title responsive-table__head__title--permission">
                                        Job Status
                                    </th>
                                    {allowed ? <th className="responsive-table__head__title responsive-table__head__title--actions">
                                        Actions
                                    </th> : null}
                                </tr>
                            </thead>
                            <tbody className="responsive-table__body">
                                {jobs.length > 0 ? jobs.map((job, index) => {
                                    return (<tr className="responsive-table__row" key={index}>
                                        <td className="responsive-table__body__text responsive-table__body__text--name">
                                            {job.name}
                                        </td>
                                        <td className="responsive-table__body__text responsive-table__body__text--email">
                                            {job.cronString}
                                        </td>
                                        <td className="responsive-table__body__text responsive-table__body__text--role">
                                            {job.cronQuery}
                                        </td>
                                        <td className={`responsive-table__body__text responsive-table__body__text--permission ${job.status === 'stopped ? run-btn : stop-btn'}`}>
                                            {job.status}
                                        </td>
                                        {allowed ? <td className="responsive-table__body__text responsive-table__body__text--actions">
                                            <div className='buttn-tables'>
                                                {job.status === 'running' ?
                                                    <a href="#" onClick={() => stopJob(job.id)} className='stop-btn'>Stop</a> : <a href="#" onClick={() => startJob(job.id)} className='run-btn'>Run</a>}
                                            </div>
                                        </td> : null}
                                    </tr>);
                                }) : null}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CronPage;

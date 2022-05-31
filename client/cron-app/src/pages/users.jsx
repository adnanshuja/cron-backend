import { useEffect, useState } from "react";
import apiClient from '../helpers/apiClient';
import dotsSvg from '../assest/images/dots.svg'
import closedSvg from '../assest/images/close.svg'
import Navbar from '../components/navbar.js';

function UsersPage() {
    const [users, setUsers] = useState([])
    const [clicked, setClicked] = useState(false)
    const [isEditing, setisEditing] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    useEffect(() => {
        async function fetcUsers() {
          const {data} =await apiClient.get('auth/get-all')
          setUsers(data)
        }
        fetcUsers();
      }, []);
    return (
        <div className="main-wrapp">
            <Navbar/>
            <div className="content-wrap">
            <section className="section-space">
                    <div className="heading-title text-left">
                        <h2>Users [ visible only to admin ] </h2>
                    </div>
                    <div className="table-wrapper">
                        <table className="responsive-table">
                            <thead className="responsive-table__head">
                                <tr className="responsive-table__row">
                                    <th className="responsive-table__head__title responsive-table__head__title--name">User
                                        Name</th>
                                    <th className="responsive-table__head__title responsive-table__head__title--email">Email
                                    </th>
                                    <th className="responsive-table__head__title responsive-table__head__title--role">Role
                                    </th>
                                    <th className="responsive-table__head__title responsive-table__head__title--permission">
                                        Permissions </th>
                                    <th className="responsive-table__head__title responsive-table__head__title--actions">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="responsive-table__body">
                            {users.length?users.map((user,index)=>
                            { return <tr className="responsive-table__row" key={index}>
                                        <td className="responsive-table__body__text responsive-table__body__text--name">{user.name}
                                        </td>
                                        <td className="responsive-table__body__text responsive-table__body__text--email">
                                            {user.email}</td>
                                        <td className="responsive-table__body__text responsive-table__body__text--role">{user.role}</td>
                                        <td className="responsive-table__body__text responsive-table__body__text--permission">
                                            {user.permissions.map((permission, i)=>{
                                                return <span className="permmission-indicator permmission-indicator--create" key={i}>{permission}</span> })}
                                        </td>
                                </tr>
                                
                                }):null}
                            </tbody>
                        </table>
                    </div>
            </section>
            <div className={"show-table-information mw-320 " + (isEditing ? 'show' : 'hidden')} id="userdetails">
                <div className="table-info-header">
                <h2>Edit User</h2> <span className="close-sidebar" onClick={()=>setisEditing(false)}><img src={closedSvg} alt=""/></span> </div>
                <div className="table-info-body">
                <div className="body-inner-sidebar common-form">
                    <div className="category-information">
                        <div className="record-item">
                            <div className="input-field w-100">
                                <label className="">Email Address</label>
                                <input className="" type="email" placeholder=" "/>
                            </div>
                        </div>
                        <div className="record-item">
                            <div className="input-field w-100">
                                <label className="">Email Address</label>
                                <input className="" type="email" placeholder=" "/>
                            </div>
                        </div>
                        <div className="record-item">
                            <div className="input-field w-100">
                                <label className="">Email Address</label>
                                <input className="" type="email" placeholder=" "/>
                            </div>
                        </div>
                        <div className="record-item">
                            <div className="input-field w-100">
                                <label className="">Email Address</label>
                                <input className="" type="email" placeholder=" "/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="table-info-footer">
                <div className="">
                    <div className="text-center"><a className="theme-btn" href="javascript:void(0)"> Save </a></div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
  }
  
  export default UsersPage;
  
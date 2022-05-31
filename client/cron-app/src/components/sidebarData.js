import React from 'react';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <IoIcons.IoIosHome />,
        cName: 'nav-text',
        allowedRoles: ['admin', 'user', 'sub-admin', 'manager']
    },
    {
        title: 'Users',
        path: '/users',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text',
        allowedRoles: ['admin', 'sub-admin']
    },
    {
        title: 'Jobs',
        path: '/crons',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text',
        allowedRoles: ['admin', 'user', 'sub-admin', 'manager']
    },
    {
        title: 'Basic User',
        path: '/basic-user',
        icon: <IoIcons.IoIosBug />,
        cName: 'nav-text',
        allowedRoles: [ 'user']
    },
    {
        title: 'Reports',
        path: '/reports',
        icon: <IoIcons.IoIosMap />,
        cName: 'nav-text',
        allowedRoles: ['admin', 'manager']
    },
    {
        title: 'Logout',
        path: '/login',
        icon: <IoIcons.IoIosLogOut />,
        cName: 'nav-text',
        allowedRoles: ['admin', 'user', 'sub-admin', 'manager']
    },
];
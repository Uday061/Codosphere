// // src/components/Navbar.js
// import React, { useState, useEffect } from 'react';
// import useDebounce from '../hooks/useDebounce';
// import axios from 'axios';

// export default function Navbar() {
//     const [query, setQuery] = useState('');
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const debouncedQuery = useDebounce(query, 500); // 500ms debounce delay
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         // Fetch all users when the component mounts
//         const getAllUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5555/api/user/getAllUsers', {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 setUsers(response.data);
//                 setFilteredUsers(response.data); // Initially set to all users
//             } catch (err) {
//                 console.error('Error fetching users:', err);
//             }
//         };
//         getAllUsers();
//     }, [token]);

//     useEffect(() => {
//         if (debouncedQuery) {
//             const filtered = users.filter(user =>
//                 `${user.firstName} ${user.lastName}`.toLowerCase().includes(debouncedQuery.toLowerCase())
//             );
//             setFilteredUsers(filtered);
//         } else {
//             setFilteredUsers([]); // Set to empty array if query is empty
//         }
//     }, [debouncedQuery, users]);

//     const handleChange = (event) => {
//         setQuery(event.target.value);
//     };

//     return (
//         <div>
//             <div className="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
//                 <div className="ml-8 text-lg text-gray-700 hidden md:flex">My Website</div>
//                 <span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
//                     <input 
//                         type="search" 
//                         name="search" 
//                         placeholder="Search"
//                         className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
//                         value={query}
//                         onChange={handleChange}
//                     />
//                     <i className="fas fa-search m-3 mr-5 text-lg text-gray-700 w-4 h-4"></i>
//                 </span>
//                 <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
//                     <i className="fas fa-bars"></i>
//                 </div>
//                 <div className="flex flex-row-reverse mr-8 hidden md:flex">
//                     <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Button</div>
//                     <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Link</div>
//                     <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Friends</div>
//                 </div>
//             </div>
//             <div className="mt-4 mx-auto max-w-lg">
//                 <ul className="bg-white shadow-md rounded-lg overflow-hidden">
//                     {filteredUsers.map(user => (
//                         <li key={user._id} className="p-4 border-b border-gray-300 hover:bg-gray-100 flex items-center">
//                             <div className="flex-shrink-0 mr-4">
//                                 <img className="h-10 w-10 rounded-full" src={user.picturePath || 'https://via.placeholder.com/40'} alt={`${user.firstName} ${user.lastName}`} />
//                             </div>
//                             <div className="text-gray-900 font-semibold">
//                                 {user.firstName} {user.lastName}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//                 {filteredUsers.length === 0 && debouncedQuery && (
//                     <div className="text-center text-gray-700 mt-4">No users found</div>
//                 )}
//             </div>
//         </div>
//     );
// }

// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

export default function Navbar() {
    const [query, setQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const debouncedQuery = useDebounce(query, 500); // 500ms debounce delay
    const token = localStorage.getItem('token');

    useEffect(() => {
        const searchUsers = async () => {
            if (!debouncedQuery) {
                setFilteredUsers([]);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5555/api/user/searchUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        query: debouncedQuery
                    }
                });
                setFilteredUsers(response.data);
            } catch (err) {
                console.error('Error searching users:', err);
            }
        };

        searchUsers();
    }, [debouncedQuery, token]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="relative">
            <div className="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
                <div className="ml-8 text-lg text-gray-700 hidden md:flex">My Website</div>
                <span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
                    <input 
                        type="search" 
                        name="search" 
                        placeholder="Search"
                        className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
                        value={query}
                        onChange={handleChange}
                    />
                    <i className="fas fa-search m-3 mr-5 text-lg text-gray-700 w-4 h-4"></i>
                </span>
                <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
                    <i className="fas fa-bars"></i>
                </div>
                <div className="flex flex-row-reverse mr-8 hidden md:flex">
                    <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Button</div>
                    <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Link</div>
                    <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Friends</div>
                </div>
            </div>
            {query && (
                <div className="w-screen md:w-1/4 absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg overflow-hidden ">
                    <ul>
                        {filteredUsers.map(user => (
                            <li key={user._id} className="p-4 border-b border-gray-300 hover:bg-gray-100 flex items-center">
                                <div className="flex-shrink-0 mr-4">
                                    <img className="h-10 w-10 rounded-full" src={user.picturePath || 'https://via.placeholder.com/40'} alt={`${user.firstName} ${user.lastName}`} />
                                </div>
                                <div className="text-gray-900 font-semibold">
                                    {user.firstName} {user.lastName}
                                </div>
                            </li>
                        ))}
                    </ul>
                    {filteredUsers.length === 0 && (
                        <div className="text-center text-gray-700 mt-4">No users found</div>
                    )}
                </div>
            )}
        </div>
    );
}

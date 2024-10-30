import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', class: '', rank: '', totalscore: '', quizscore: [], accuracy: '' });
    const [showForm, setShowForm] = useState(false);
    const usersPerPage = 5;

    const fetchUsers = async () => {
        const usersCollection = collection(db, 'et4s_main');
        const userDocs = await getDocs(usersCollection);
        const usersList = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const totalPages = Math.ceil(users.length / usersPerPage);
    const currentUsers = users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            const userRef = doc(db, 'et4s_main', editingUser.id);
            await updateDoc(userRef, newUser);
            setEditingUser(null);
        } else {
            await addDoc(collection(db, 'et4s_main'), newUser);
        }
        setNewUser({ name: '', email: '', class: '', rank: '', totalscore: '', quizscore: [], accuracy: '' });
        setShowForm(false);
        fetchUsers();
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUser(user);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const userRef = doc(db, 'et4s_main', id);
        await deleteDoc(userRef);
        fetchUsers();
    };

    return (
        <div className="admin-dashboard container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-center text-3xl font-bold mb-4">Admin Dashboard</h1>
            <button className="btn bg-blue-500 text-black py-2 px-4 rounded mb-4" onClick={() => { setShowForm(true); setEditingUser(null); }}>Add User</button>
            {showForm && (
                <form onSubmit={handleSubmit} className="mb-4 bg-black p-4 rounded shadow-md">
                    <input type="text" name="name" value={newUser.name} onChange={handleChange} placeholder="Name" required className="border border-gray-300 p-2 mb-2 w-full rounded" />
                    <input type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Email" required className="border border-gray-300 p-2 mb-2 w-full rounded" />
                    <input type="text" name="class" value={newUser.class} onChange={handleChange} placeholder="Class" required className="border border-gray-300 p-2 mb-2 w-full rounded" />
                    <input type="text" name="rank" value={newUser.rank} onChange={handleChange} placeholder="Rank" required className="border border-gray-300 p-2 mb-2 w-full rounded" />
                    <input type="text" name="totalscore" value={newUser.totalscore} onChange={handleChange} placeholder="Total Score" required className="border border-gray-300 p-2 mb-2 w-full rounded" />
                    <input type="number" name="accuracy" value={newUser.accuracy} onChange={handleChange} placeholder="Accuracy (%)" required className="border border-gray-300 p-2 mb-2 w-full rounded" />

                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-green-500 text-white py-1 px-3 rounded">{editingUser ? 'Update User' : 'Add User'}</button>
                        <button type="button" className="bg-red-500 text-white py-1 px-3 rounded" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>


            )}
            <div className="overflow-x-auto">
                <table className="user-table table-auto w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Class</th>
                            <th className="px-4 py-2">Rank</th>
                            <th className="px-4 py-2">Total Score</th>
                            <th className="px-4 py-2">Quiz Score</th>
                            <th className="px-4 py-2">Accuracy</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.name} {user.surname}</td>
                                <td>{user.email}</td>
                                <td>{user.class}</td>
                                <td>{user.rank}</td>
                                <td>{user.totalscore}</td>
                                <td>{user.quizscore ? user.quizscore.join(', ') : 'N/A'}</td>
                                <td>
                                    {typeof user.accuracy === 'number' ? user.accuracy.toFixed(2) + '%' : 'N/A'}
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className="flex justify-center mt-4">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded mr-2" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
                    <span className="self-center">{currentPage + 1} of {totalPages}</span>
                    <button className="bg-gray-400 text-white py-2 px-4 rounded ml-2" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Admin;

// Admin.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'et4s_main');
            const userDocs = await getDocs(usersCollection);
            const usersList = userDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersList);
        };

        fetchUsers();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Get current users to display
    const currentUsers = users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="admin-dashboard container-fluid">
            <h1 className="text-center">Admin Dashboard</h1>
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12">
                    <table className="user-table table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Class</th>
                                <th>Rank</th>
                                <th>Total Score</th>
                                <th>Quiz Score</th>
                                <th>Accuracy</th>
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
                                    <td>{user.accuracy ? user.accuracy.toFixed(2) + '%' : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 0}>
                            Previous
                        </button>
                        <span>{currentPage + 1} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

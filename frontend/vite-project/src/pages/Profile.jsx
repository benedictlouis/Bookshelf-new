import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../actions/user.action";

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(id);

                if (response.success) {
                    setUser(response.data);
                } else {
                    setError("Failed to fetch user data.");
                }
            } catch (error) {
                setError("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <div>
                    <p><strong>User ID:</strong> {user._id}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;

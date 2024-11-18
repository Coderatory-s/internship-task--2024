import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserIdFromToken } from './FeedPosts';

const Friends: React.FC = () => {
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [requestId, setRequestId] = useState('');
    const [message, setMessage] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);

    // Get the logged-in user's ID (from localStorage or dynamically fetched)
    const userId = getUserIdFromToken(); // Assuming userId is saved in localStorage after login

    // Fetch the list of friends
    useEffect(() => {
        fetchFriendsList();
        // fetchPendingRequests();
    }, []);

    const fetchFriendsList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/v1/friends/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setFriends(response.data);
        } catch (error) {
            console.error('Error fetching friends list:', error);
        }
    };

    // Fetch pending friend requests
    // const fetchPendingRequests = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:3000/v1/friends/pending/${userId}`);
    //         setPendingRequests(response.data);
    //     } catch (error) {
    //         console.error('Error fetching pending requests:', error);
    //     }
    // };

    // Send a friend request
    const sendFriendRequest = async (receiverId: string) => {
        try {
            const response = await axios.post('http://localhost:3000/v1/friends/request', {
                senderId: userId,
                receiverId,
            });
            setMessage(`Friend request sent to user ${receiverId}`);
            fetchFriendsList();
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    // Accept a friend request
    const acceptFriendRequest = async (requestId: string) => {
        try {
            await axios.post('http://localhost:3000/v1/friends/accept', { requestId });
            setMessage('Friend request accepted');
            // fetchPendingRequests();
            fetchFriendsList();
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    // Reject a friend request
    const rejectFriendRequest = async (requestId: string) => {
        try {
            await axios.post('http://localhost:3000/v1/friends/reject', { requestId });
            setMessage('Friend request rejected');
            // fetchPendingRequests();
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    // Search for users by name
    // const searchUsers = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:3000/v1/users/search/username?query=${searchQuery}`);
    //         setSearchResults(response.data);
    //     } catch (error) {
    //         console.error('Error searching users:', error);
    //     }
    // };
    const searchUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/v1/users/search/username?name=${searchTerm}`);
          if (response.data.users) {
            setSearchResults(response.data.users); // Assuming the API returns an array of user objects
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          setSearchResults([]);
        //   toast.error("Search failed. Please try again.");
        }
      };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Friends Management</h2>

            {/* Search and Add Friend */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Search for Friends</h3>
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border p-2 w-full mb-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={searchUsers}
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
                {/* Display search results */}
                {searchResults.length > 0 && (
                    <ul className="mt-4">
                        {searchResults.map((user: any) => (
                            <li key={user._id} className="flex justify-between items-center mb-2">
                                {user.name}
                                <button
                                    onClick={() => sendFriendRequest(user._id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded">
                                    Add Friend
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Pending Friend Requests */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Pending Friend Requests</h3>
                {pendingRequests.length > 0 ? (
                    <ul>
                        {pendingRequests.map((request: any) => (
                            <li key={request._id} className="flex justify-between items-center mb-2">
                                Request from: {request.senderId}
                                <div>
                                    <button
                                        onClick={() => acceptFriendRequest(request._id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => rejectFriendRequest(request._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded">
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending friend requests.</p>
                )}
            </div>

            {/* Friends List */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Your Friends</h3>
                {friends.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {friends.map((friend: any) => (
                            <li key={friend._id}>
                                {friend.senderId === userId ? friend.receiverId : friend.senderId}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have no friends yet.</p>
                )}
            </div>

            {/* Display messages */}
            {message && <div className="text-green-500 mt-4">{message}</div>}
        </div>
    );
};

export default Friends;

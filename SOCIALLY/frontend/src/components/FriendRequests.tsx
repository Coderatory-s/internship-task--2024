// import { useQuery, useMutation } from "@tanstack/react-query";
// import { fetchFriendRequests, acceptRequest } from "@/api/friendApi";

// const FriendRequests = () => {
//   const { data: requests, isLoading } = useQuery("friendRequests", fetchFriendRequests);
//   const { mutate: acceptFriend } = useMutation(acceptRequest);

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h4>Friend Requests</h4>
//       {requests.map((request) => (
//         <div key={request.id} className="flex justify-between items-center mb-2">
//           <p>{request.name}</p>
//           <button onClick={() => acceptFriend(request.id)} className="bg-green-500 text-white p-2">
//             Accept
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FriendRequests;

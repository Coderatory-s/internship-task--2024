// const Notifications = () => {
//     const { data: notifications, isLoading } = useQuery("notifications", fetchNotifications);
  
//     if (isLoading) return <p>Loading...</p>;
  
//     return (
//       <div>
//         <h4>Notifications</h4>
//         {notifications.map((notification) => (
//           <div key={notification.id} className="mb-2">
//             <p>{notification.message}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default Notifications;
  
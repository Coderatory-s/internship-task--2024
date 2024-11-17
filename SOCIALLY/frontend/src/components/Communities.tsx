// const Communities = () => {
//     const { data: communities, isLoading } = useQuery("communities", fetchCommunities);
  
//     if (isLoading) return <p>Loading...</p>;
  
//     return (
//       <div>
//         <h4>Communities</h4>
//         {communities.map((community) => (
//           <div key={community.id} className="mb-2">
//             <p>{community.name}</p>
//             <p>Category: {community.category}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default Communities;
  
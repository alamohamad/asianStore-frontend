// import React from 'react';
// import { useSelector } from 'react-redux';

// export default function CartPage() {
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   return (
//     <div>
//       <h2>Cart Page</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map((item, index) => (
//             <tr key={index}>
//               <td>{item.name}</td>
//               <td>
//                 <img src={item.img} alt={item.name} style={{ width: '50px' }} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

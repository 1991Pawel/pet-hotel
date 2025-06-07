"use client";
// import styles from "./MessageTable.module.css";
// import { deleteMessage } from "@/app/actions/messageActions";
// import { useRouter } from "next/navigation";

// export const MessagesTable = ({ messages, isOutbox }) => {
//   const router = useRouter();

//   const handleDeleteMessage = async (messageId) => {
//     await deleteMessage(messageId, isOutbox);
//     router.refresh();
//   };

//   const handleRowSelect = (key) => {
//     const message = messages.find((msg) => msg.id === key);

//     const url = isOutbox
//       ? `/user/${message.recipientId}`
//       : `/user/${message.senderId}`;
//     router.push(url + "/chat");
//   };

//   return (
//     <div className={styles.mailContainer}>
//       <table className={styles.mailTable}>
//         <thead>
//           <tr>
//             <th>Nadawca</th>
//             <th>Wiadomość</th>
//             <th>Data</th>
//             <th>Akcje</th>
//           </tr>
//         </thead>
//         <tbody>
//           {messages?.map((msg, index) => (
//             <tr
//               onClick={() => handleRowSelect(msg.id)}
//               key={index}
//               className={styles.mailRow}
//             >
//               <td>{msg.senderName}</td>
//               <td>{msg.text}</td>
//               <td>{msg.created}</td>
//               <td>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteMessage(msg.id);
//                   }}
//                 >
//                   Usuń
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

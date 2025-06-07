// const formatDate = (date: string) => {
//   const formatedData = new Date(date).toLocaleString("pl-PL", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return formatedData;
// };

// export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
//   return {
//     id: message.id,
//     text: message.text,
//     created: formatDate(message.created),
//     dateRead: message.dateRead ? formatDate(message.dateRead) : null,
//     senderId: message.sender?.userId,
//     senderName: message.sender?.name,
//     senderImage: message.sender?.image,
//     recipientId: message.recipient?.userId,
//     recipientImage: message.recipient?.image,
//     recipientName: message.recipient?.name,
//   };
// }

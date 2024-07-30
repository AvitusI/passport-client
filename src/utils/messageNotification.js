export const groupByUser = (notifications) => {
  return notifications.reduce((acc, notification) => {
    const { senderId } = notification;
    const { _id } = senderId;
    if (!acc[_id]) {
      acc[_id] = {
        username: senderId.username,
        avatar: senderId.avatar,
        _id,
        reads: [],
      };
    }
    acc[_id].reads.push(notification);
    return acc;
  }, {});
};

export const transformNotification = (groupedNotifications) => {
  return Object.values(groupedNotifications).map((group) => {
    return {
      message: `${group.username} messaged you`,
      username: group.username,
      avatar: group.avatar,
      _id: group._id,
    };
  });
};

export const getFollowersSummary = (followers) => {
  const followerCount = followers.length;

  if (followerCount === 0) {
    return `Not followed by anyone you know`;
  }

  const names = followers.map((follower) => follower.username);

  if (followerCount === 1) {
    return `Followed by ${names[0]}`;
  }

  if (followerCount === 2) {
    return `Followed by ${names[0]} and ${names[1]}`;
  }

  if (followerCount === 3) {
    return `Followed by ${names[0]}, ${names[1]}, and ${names[2]}`;
  }

  return `Followed by ${names[0]}, ${names[1]}, and ${followerCount - 2} others`;
};

export const getCommonFollowers = (userFollowers, otherUserFollowers) => {
  const otherUserFollowersIds = new Set(otherUserFollowers?.map((follower) => follower._id));

  return userFollowers.filter((follower) => otherUserFollowersIds.has(follower._id));
};

export const getFollowersByProfileSummary = (user, otherUser) => {
  if (!user || !otherUser) return;

  const userFollowers = user?.followers;
  const otherUserFollowers = otherUser?.followers;

  console.log(`User: ${JSON.stringify(userFollowers, null, ' ')}`);
  console.log(`Other: ${JSON.stringify(otherUserFollowers, null, ' ')}`);

  console.log(JSON.stringify(userFollowers, null, ' '));
  console.log(JSON.stringify(otherUserFollowers, null, ' '));

  const commonFollowers = getCommonFollowers(userFollowers, otherUserFollowers);

  const followersCount = commonFollowers.length;

  if (followersCount === 0) {
    return `Not followed by anyone you follow`;
  }

  const names = commonFollowers.map((follower) => follower.username);

  if (followersCount === 1) {
    return `Followed by ${names[0]}`;
  }

  if (followersCount === 2) {
    return `Followed by ${names[0]} and ${names[1]}`;
  }

  if (followersCount === 3) {
    return `Followed by ${names[0]}, ${names[1]}, and ${names[2]}`;
  }

  return `Followed by ${names[0]}, ${names[1]}, and ${followersCount - 2} others`;
};

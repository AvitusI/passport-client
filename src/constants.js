export const posts = [
  {
    _id: 1,
    content:
      "Hi there! This is my first post. I hope you like it! I'm going to be posting a lot of cool stuff here. Stay tuned!",
    author: {
      id: 1,
      username: "john_doe",
      avatar: "/images/honey.jpg",
    },
    comments: [
      "Great post!",
      "I can't wait to see more!",
      "I love your content!",
      "Keep up the good work!",
    ],
    pic: "/images/milk.jpg",
    likes: ["john_doe", "jane_smith", "joe_doe"],
  },
  {
    _id: 2,
    content:
      "Hi there! This is my second post. I hope you like it! I'm going to be posting a lot of cool stuff here. Stay tuned!",
    author: {
      id: 1,
      username: "jane smith",
      avatar: "/images/milk.jpg",
    },
    comments: [
      "Great post!",
      "I can't wait to see more!",
      "I love your content!",
      "Keep up the good work!",
    ],
    pic: "/images/baloon.jpg",
    likes: ["john_doe", "jane_smith", "joe_doe"],
  },
  {
    _id: 3,
    content:
      "Hi there! This is my third post. I hope you like it! I'm going to be posting a lot of cool stuff here. Stay tuned!",
    author: {
      id: 1,
      username: "jane doe",
      avatar: "/images/milk.jpg",
    },
    comments: [
      "Great post!",
      "I can't wait to see more!",
      "I love your content!",
      "Keep up the good work!",
    ],
    pic: "/images/baloon.jpg",
    likes: ["john_doe", "jane_smith", "joe_doe"],
  },
];

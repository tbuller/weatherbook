# Weatherbook

Click on the image below for a quick demo (please excuse the bad quality from YouTube)

[![Demo link](https://img.youtube.com/vi/yCt4OlxP7xI/0.jpg)](https://www.youtube.com/watch?v=yCt4OlxP7xI)

# Tech Stack

![Image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Image](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Image](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

# Spec

Weatherbook is a full-stack social media application, centred around the exhilirating world of weather-related discourse. It allows users to share specific data points and express their thoughts about various weather conditions. Other users can engage in these discussions through comments and likes. The application allows users to send and accept friend requests, and the built-in search functionality makes it easy to explore other profiles. Users can personalise their own profiles, including their profile photo. Additionally, the application features private messaging, enabling users to have individual chats with different users.

# Installation

[Clone this repo](https://github.com/tbuller/weatherbook.git)

In terminal (Mac), run:

```
cd api
npm install
npm start
```
Open another terminal in the same codebase:
```
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

# Features

## Home page

The homepage presents users with a feed of posts, their own and those from friends, arranged in chronological order. A collapsible form allows for the creation of posts, disappearing once the user has clicked "Post!". In addition to sharing thoughts on weather conditions, users can select specific data points to include in their posts. The process begins when a city is chosen, triggering an API call that fetches the city's coordinates. These coordinates then feed into another API call to a different web API, which provides the projected weather for the upcoming week. Users are also able to comment on posts, as well as like comments. All of this data is stored in the database, and the responses from the database are used to update the components with Redux.

![Image](https://github.com/tbuller/weatherbook/blob/main/frontend/public/README_images/Weatherbook-homepage-screenshot.png)

## Profile

When users select the profile tab, they are presented with their personal details along with all of their posts to date. Here, users can update their profile, which includes uploading photos and writing about themselves.

![Image](https://github.com/tbuller/weatherbook/blob/main/frontend/public/README_images/Weatherbook-profile-screenshot.png)

## Friends search

As a user begins typing, a drop-down menu reveals a list of matching user profiles. Selecting a profile from this list brings up additional information about that particular user. If the selected user is not already in the friends array of the logged in user, there is the option to send them a friend request. Otherwise, it will show that the user is already a friend, or that a request has been sent (from either the logged in user or the selected user).

![Image](https://github.com/tbuller/weatherbook/blob/main/frontend/public/README_images/Weatherbook-find-friends-screenshot.png)

## Notifications

In the notifications tab, the logged in user can see all of the friend requests that have been sent by other users. On accepting a request, a new friend is created in the database and the response from the API is used to update the button, showing that the request has been accepted.

![Image](https://github.com/tbuller/weatherbook/blob/main/frontend/public/README_images/Weatherbook-notifications-screenshot.png)

## Chat

In the Messages tab, users have a chat feature. Users are able to create as many chats as they would like with users that are in their friends array. Users can select a chat, which will display all of the messages sent by both users involved, and give the logged in user the oppotunity to add more to send more messages.

![Image](https://github.com/tbuller/weatherbook/blob/main/frontend/public/README_images/Weatherbook-chats-screenshot.png)


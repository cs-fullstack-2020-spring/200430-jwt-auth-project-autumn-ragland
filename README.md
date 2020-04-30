# 200430 JWT Auth Project
### Requirements - Movie Review Site
Create a full-stack MERN application that allows users to register and login. If a user is unable to login or register display the appropriate error in an alert. When a user is not logged in allow them to view all movie reviews. When a user is logged in allow them to view all movie reviews, their specific movie reviews, and add a movie review. 
### Model
#### User
- name
- password
- email
- date (default now)
#### Movie Review
- movie title
- movie year released
- movie review
- movie review author 
### Server Functionality (minimum)
- read all movie reviews
- read movie reviews by user email
- add movie review
- login existing user from collection
- create new user in collection 
### Client Functionality (minimum)
- login form
- registration form
- new movie form (only available if logged in)
- display all movie reviews
- display movie reviews of logged in user (only available if logged in)
- log out
### Bonus
- Redirect from login, registration, and movie review forms on submit
- bootstrap styling
- edit movie rating
- delete movie rating
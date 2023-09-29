# Overview

To properly use the code in this repository, you will have to use npm i, and then npm serve to acess the node_modules that are required for the project.

This is a simple test that I have setup to verify that Firebase cloud database will work for transferring data in the future project I am planning. I am able to upload, modify, and delete data from the database, and it should work for both phoen and web applications

The software that I have made operates as a test for a future task manager app. In the test you can use javascript alerts to create tasks, and complete them. Completeing a task will either incriment a corrosponding value, or it will delete the task entirely. All changes are saved to the Firebase cloud.

My purpose in writing this softwear is as the first step in a larger project. Where I make a clean, professional looking habit tracking app that is able to work on both android devices and the web.


[Software Demo Video](https://youtu.be/37U4If-Dk1o)

# Cloud Database

I am using Cloud Firebase for this project, as it is easy to learn and works on a wide variety of devices.

The database that I am running has a single table called Data. In this table are saved five categories of data, Habits, Goals, Daylies, Weeklies, and Monthlies. Each of these will be uploaded into the app when the app is opened so that the user can continue where they left off, and each time they make a change both the database and the app will refresh.

# Development Environment

To develop this sofwear I have used Visual Studio Code, and the Firebase websight. I plan to soon impliment android studio into the project, to work with phone based Java applications.

For this first test, I have used the Javascript language.

# Useful Websites

- [Android development, youtube](https://www.youtube.com/watch?v=fis26HvvDII)
- [Firebase Official websight](https://firebase.google.com/)
- [Stack Overflow](https://stackoverflow.com/questions/27319043/javascript-is-an-alert-in-a-for-loop-possible)

# Future Work


- I need to make sure I can get data on an java based anroid application
- I plan to update the code so that each stored task has a timestamp, and the status on the task completion is updated every 24 hours
- I need to update my apps with buttons and visual tools rather than the currently confusing alert system
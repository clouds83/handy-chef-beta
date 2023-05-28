![Logo](https://claudio-godoy.com/github/hcp-github.png)

Handy Chef is an Android app developed using the Ionic and Angular frameworks. Its primary function is to enable users to save recipes locally on their device's storage. 

Additionally, the app features a convenient functionality that allows users to push recipe ingredients to a shopping list. Notably, the shopping list also offers the flexibility to include items that are not specifically associated with a recipe.
## Disclaimer

Please be aware that the code for this app is not open source. The public repository is solely intended to showcase my coding skills and expertise for potential opportunities. The intellectual property associated with the app is exclusively for my use. Thank you for respecting these terms.
## Demonstration

The app is currently available on the Play Store and is free to download.

Click the link: https://play.google.com/store/apps/details?id=com.clouds.handychef

Or scan the QR code on your Android device:

![Logo](https://claudio-godoy.com/github/hc-qr-code.png)
## Functionalities

- Save, edit and delete recipes
- Text based filter that allows the user to show recipes based on a keyword
- Send the ingredients of a recipe to a shopping list
- Manage shopping list itens adding, editing and deleting them



## Screenshots

![App Screenshot](https://claudio-godoy.com/github/hc-screenshots.png)


## Motivation 

The main reason for me to start developing this app was to learn the Ionic framework. Since Ionic allows the use of Angular for building mobile apps, I believed it would greatly simplify the process.

Another motivation was the fact that as an enthusiastic cook, I couldn't find a free app that effectively combined these two functionalities in a reliable way. So, the idea behind this app was to create a simple and user-friendly solution where people could store their recipes and access a built-in shopping list.

The goal was to provide a free app with a beautiful UI, without unnecessary features that no one uses and ad-free.
# Next step, Handy Chef PRO

A PRO version of Handy Chef is already in production.

This version will be similar to the free one, but it will include authentication and save recipes in a cloud-based database. This ensures that user data is persisted even if they change devices or need access from multiple devices.

Additionally, the PRO version provides a secure way to store recipes. Unlike a local database that could be accidentally deleted when a user tries to free up device space, the cloud-based database safeguards against such issues.

### Test the Handy Chef Pro

Unfortunately, due to security reasons, I am unable to share the repository of this application, as it contains sensitive data such as my Firebase key. However, I have deployed the project as a web app, leveraging the compatibility between Ionic and Angular. Please note that although this app is designed for mobile devices, the layout may appear spread out on a monitor.

You can test the hosted project at the following link: https://handy-chef-v2-clouds83.vercel.app/

Please be aware that the application is still in production, and there may be bugs or issues that arise during testing.


## Backend As A Service

As my focus is primarily on front-end development and I did not wish to incur the cost of hiring a backend developer for this educational app, I made the decision to use Firebase as my backend solution.

Currently, I am utilizing three Firebase services:

Authentication: This service handles user registration and login functionality.
Firestore database: I rely on Firestore to store all recipe data. This includes references to the user who owns the recipe and to the associated recipe images. Firestore is well-suited for managing structured data, although it is not designed for handling large files.
Storage: I utilize Firebase Storage to store the recipe images.
By independently implementing these services, I have gained valuable experience. Firebase, despite being a straightforward backend solution, offers versatility, allowing for the creation of various types of applications, including web, desktop, and mobile platforms.

### Data sync between local and cloud

One of the most valuable lessons I have learned so far is how to manage data storage both locally and in the cloud.

Having a cloud database serves as a security measure, ensuring that all data is replicated on the user's device. This enables access to the recipes even without an internet connection. Additionally, this approach enhances the app's performance by eliminating the need to rely on internet connectivity for loading recipe data and images.

Currently, this functionality is partially implemented. For instance, if the user erases the data from their device and reloads the application, it will download the recipes but not the associated images. Implementing the synchronization of images is still a pending task.

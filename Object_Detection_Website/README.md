Full-Stack Website with Flask and React:
--> This project is a full-stack web application that enables users to upload transportation-related images, perform object detection on those images, and display the results.

Features:
--> Users can upload images related to transportation, such as traffic camera images
--> The backend is built using Flask which handles image processing tasks using YoloV5 and serves the processed image to the frontend.
--> The frontend is build using React, providing an interactive user Interface.
--> Docker is used for easy deployment and management of application.

Technologies Used:
--> Frontend: React.js, HTML, CSS, JavaScript
--> Backend: Flask (Python), YoloV5 (for object detection)
--> Containerization: Docker
--> Other Tools: Docker Compose, npm


Setup and Installation:
-- git clone <repository-url>
-- cd <project-directory>

#Install frontend dependencies
cd client
npm install

#Install backend dependencies
cd ../flask_backend

Run the application using Docker Compose:
docker-compose up --build

How to access the application in your web browser?

>Frontend: http://localhost:3000
>Backend: http://localhost:5000

Usage:
1) Upload an image using the provided form on the frontend
2) Click the "Detect Objects" button to perform object detection on the uploaded image.
3) View the results, including the original image and the processed image with the detected objects.

Contributing:
Contributions are welcome! Feel free to open issues or pull requests for any improvements or features you'd like to add.

License:
This project is licensed under the MIT License.
# RANDOM-IMAGE-SLIDER-STEGNOGRPHY-

# Random Image Slider Using Steganography

## 📌 Project Overview

**Random Image Slider Using Steganography** is a web-based application developed using React.js that demonstrates how secret messages can be hidden inside images and retrieved when needed.

The application allows users to encode secret text into an image, decode the hidden message from an encoded image, and view images through a random image slider. It also includes login and registration functionality to provide a user-friendly interface.

The main objective of this project is to demonstrate image-based steganography and provide a simple way to exchange hidden information through digital images.

## 🎯 Objectives

- To hide secret text messages inside digital images.
- To retrieve hidden messages from encoded images.
- To implement a random image slider.
- To provide login and registration functionality.
- To develop an interactive and user-friendly web application.
- To demonstrate the practical application of steganography.

## ✨ Features

- **User Login:** Allows registered users to access the application.
- **User Registration:** Provides an interface for new users to register.
- **Image Encoding:** Hides secret text messages inside supported images.
- **Image Decoding:** Extracts hidden text messages from encoded images.
- **Random Image Slider:** Displays images in a slider interface.
- **Protected Routes:** Restricts access to selected pages based on login status.
- **Responsive Interface:** Provides a simple and easy-to-use user interface.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML5 | Web page structure |
| CSS3 | Styling and layout |
| React Router | Navigation between pages |
| HTML Canvas API | Reading and processing image pixel data |
| Node.js and Express.js | Backend API, if configured |
| MongoDB | User data storage, if database integration is configured |

## 📂 Project Modules

### 1. Login Module
Allows users to log in to the application.

### 2. Registration Module
Allows new users to create an account.

### 3. Encode Module
Accepts an image and a secret message, then embeds the message into the image using the implemented steganography technique.

### 4. Decode Module
Reads a steganography-enabled image and extracts the hidden message.

### 5. Random Image Slider Module
Displays images in a slider to demonstrate image navigation and presentation.

## ⚙️ Installation and Setup

### Prerequisites

Install the following software before running the project:

- Node.js
- npm (Node Package Manager)
- Visual Studio Code or another code editor
- A modern web browser

### Step 1: Clone the Repository

```bash
git clone <your-github-repository-url>
```

### Step 2: Navigate to the Project Folder

```bash
cd RANDOM-IMAGE-SLIDER-STEGNOGRPHY
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Application

```bash
npm run dev
```

If your project uses a different development script, check the `scripts` section of `package.json`.

Open the local URL displayed in the terminal, commonly:

```text
http://localhost:5173
```

### Backend Setup

If your project includes a Node.js backend, open the backend folder in a separate terminal and install its dependencies:

```bash
npm install
```

Start the backend using the script configured in its `package.json`, for example:

```bash
npm start
```

If MongoDB is configured, add the database connection string to your environment configuration file. Do not upload passwords, database credentials, or secret environment variables to GitHub.

## 🚀 How to Use

1. Open the application in your browser.
2. Register a new account or log in.
3. Navigate to the Encode page.
4. Select a supported image and enter your secret message.
5. Encode the message and save the resulting image.
6. Open the Decode page.
7. Upload the encoded image to retrieve the hidden message.
8. Open the Slider page to view the image slider.

## 🔐 Working Principle

Steganography is a technique used to hide information inside another file, such as an image, audio file, or video.

In this project, the encoding module converts the secret text into binary data and embeds it into image pixel information according to the implemented encoding method. The decoding module reads the encoded image data and reconstructs the hidden message.

The project uses the `STEGANO1:` prefix to identify the encoded message format.

**Note:** The image must retain the encoded pixel data for successful decoding. Image formats or editing operations that modify pixel values may damage the hidden message.

## 📈 Advantages

- Demonstrates a practical application of steganography.
- Provides a simple interface for encoding and decoding messages.
- Combines image processing with web development.
- Supports modular development using React components.
- Can be extended with database-backed authentication and additional security features.

## 🔮 Future Enhancements

- Implement secure password hashing and database-backed authentication.
- Add encryption before hiding secret messages.
- Support additional image formats where technically suitable.
- Improve responsive design for mobile devices.
- Add file validation and message-size limits.
- Improve error handling and user feedback.
- Add user activity history and additional security features.

## ⚠️ Limitations

- The amount of text that can be hidden depends on the image dimensions and encoding method.
- The encoded image must preserve the required pixel information.
- Steganography alone does not encrypt a message.
- Authentication security depends on the actual backend and database implementation.

## 👩‍💻 Author

**Sakshi Bombale**

## 📄 License

This project was developed for educational and academic purposes. Add a suitable open-source license if you intend to distribute or reuse the project publicly.

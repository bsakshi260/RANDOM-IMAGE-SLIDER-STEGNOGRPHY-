# MongoDB Atlas Setup

This project is configured for the MongoDB Atlas cluster shown during setup.

## Database configuration

- Database name: `steganoDB`
- Collection name: `users`
- Cluster host: `cluster0.pkpqadf.mongodb.net`
- Backend: Node.js + Express + Mongoose

## Important security step

The Atlas credentials supplied during setup are **not included in this ZIP**. Do not put your real MongoDB password in the frontend or commit it to GitHub.

Because the database password was shared during setup, rotate/change that Atlas database-user password before using it.

## Configure the backend

1. Open the `server` folder.
2. Copy `server/.env.example` to `server/.env`.
3. Replace the placeholders with your current/new Atlas database username and password.

Example:

```env
MONGO_URI=mongodb+srv://YOUR_ATLAS_DB_USERNAME:YOUR_ATLAS_DB_PASSWORD@cluster0.pkpqadf.mongodb.net/steganoDB?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
```

If your Atlas password contains characters such as `@`, `#`, `/`, `?`, `:` or `%`, URL-encode the password before putting it in the connection string.

## Atlas network access

Your computer's public IP address must be allowed in the Atlas project's Network Access / IP Access List.

## Install and run

From the project root:

```powershell
npm install
```

Then install backend dependencies:

```powershell
cd server
npm install
```

Start the backend:

```powershell
npm run dev
```

You should see:

```text
MongoDB connected successfully
Server running on http://localhost:5000
```

Open another terminal in the project root and start React:

```powershell
npm run dev
```

The frontend normally opens at:

```text
http://localhost:5173
```

## Login and registration

Registration creates a document in:

```text
steganoDB.users
```

The password is hashed with `bcryptjs` before it is stored.

Login checks the MongoDB user and password, then returns a JWT to the React application.

## Demo account (optional)

To create the demo account:

```powershell
cd server
npm run seed
```

Credentials:

```text
Username: admin
Password: admin123
```

You can also use the Registration page to create your own account.

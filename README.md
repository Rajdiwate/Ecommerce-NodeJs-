## API Reference

### Authentication & User Management Routes

#### 1. Register User

- **URL**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user. The avatar can be uploaded as a part of the request.
- **Middleware**: `upload.fields([{ name: "avatar" }])`
- **Request Body**:
  - `name` (string) – required
  - `email` (string) – required
  - `password` (string) – required
  - `avatar` (file) – optional
- **Response**: JSON with user details and tokens

#### 2. Login User

- **URL**: `/login`
- **Method**: `POST`
- **Description**: Logs in a user and provides access and refresh tokens.
- **Request Body**:
  - `email` (string) – required
  - `password` (string) – required
- **Response**: JSON with user details and tokens

#### 3. Forgot Password

- **URL**: `/password/forgot`
- **Method**: `POST`
- **Description**: Sends a password reset link to the user's email.
- **Request Body**:
  - `email` (string) – required
- **Response**: JSON with message indicating email sent

#### 4. Reset Password

- **URL**: `/password/reset/:token`
- **Method**: `PUT`
- **Description**: Resets the user's password using a token.
- **Request Body**:
  - `password` (string) – required
  - `confirmPassword` (string) – required
- **Response**: JSON with message indicating success or failure

#### 5. Logout User

- **URL**: `/logout`
- **Method**: `GET`
- **Description**: Logs out the current user by invalidating their tokens.
- **Middleware**: `verifyJWT`
- **Response**: JSON with success message

#### 6. Refresh Access Token

- **URL**: `/refreshToken`
- **Method**: `POST`
- **Description**: Refreshes the user's access token.
- **Response**: JSON with a new access token

#### 7. Update Password

- **URL**: `/password/update`
- **Method**: `PUT`
- **Description**: Updates the current user's password.
- **Middleware**: `verifyJWT`
- **Request Body**:
  - `currentPassword` (string) – required
  - `newPassword` (string) – required
- **Response**: JSON with message indicating success or failure

#### 8. Get Current User

- **URL**: `/me`
- **Method**: `GET`
- **Description**: Retrieves details of the currently logged-in user.
- **Middleware**: `verifyJWT`
- **Response**: JSON with user details

#### 9. Update Profile

- **URL**: `/me/update`
- **Method**: `PUT`
- **Description**: Updates the current user's profile, including the avatar.
- **Middleware**: `verifyJWT`, `upload.fields([{ name: "avatar" }])`
- **Request Body** (optional):
  - `name` (string)
  - `email` (string)
  - `avatar` (file)
- **Response**: JSON with updated user details

---

### Admin Routes

#### 10. Get All Users

- **URL**: `/admin/users`
- **Method**: `GET`
- **Description**: Retrieves a list of all users. Only accessible by admins.
- **Middleware**: `verifyJWT`, `authorizeRoles("admin")`
- **Response**: JSON with list of users

#### 11. Get User Details

- **URL**: `/admin/user/:id`
- **Method**: `GET`
- **Description**: Retrieves details of a user by their ID. Only accessible by admins.
- **Middleware**: `verifyJWT`, `authorizeRoles("admin")`
- **Response**: JSON with user details

#### 12. Update User Role

- **URL**: `/admin/user/:id`
- **Method**: `PUT`
- **Description**: Updates the role of a user by their ID. Only accessible by admins.
- **Middleware**: `verifyJWT`, `authorizeRoles("admin")`
- **Request Body**:
  - `role` (string) – required
- **Response**: JSON with updated user details

#### 13. Delete User

- **URL**: `/admin/user/:id`
- **Method**: `DELETE`
- **Description**: Deletes a user by their ID. Only accessible by admins.
- **Middleware**: `verifyJWT`, `authorizeRoles("admin")`
- **Response**: JSON with success message

---

### Notes

- **Authentication Middleware (`verifyJWT`)**: This middleware is used to verify that a user is logged in by checking their JWT (JSON Web Token).
- **Authorization Middleware (`authorizeRoles`)**: This middleware checks that a user has the required roles (e.g., "admin") before granting access to the route.
- **File Upload Middleware (`upload.fields`)**: Used for uploading files like avatars. It handles multipart/form-data.



### Product Routes

#### 1. Get All Products

- **URL**: `/product`
- **Method**: `GET`
- **Description**: Retrieves a list of all products.
- **Response**: JSON with a list of products

#### 2. Create New Product (Admin)

- **URL**: `/admin/product/new`
- **Method**: `POST`
- **Description**: Creates a new product. Only accessible by admins.
- **Middleware**: `verifyJWT`, `authorizeRoles("admin")`
- **Request Body**:
  - `name` (string) – required
  - `price` (number) – required
  - `description` (string) – required
  - `images` (array) – optional
- **Response**: JSON with the created product details

#### 3. Update Product (Admin)

- **URL**: `/admin/product/:id`
- **Method**: `PUT`
- **Description**: Updates an existing product by its ID. Only accessible by admins.
- **Middleware**: `verifyJWT`, `authorizeRoles("admin")`
- **Request Body** (any fields that need to be updated):
  - `name` (string) – optional
  - `price` (number) – optional
  - `description` (string) – optional
  - `images` (array) – optional
- **Response**: JSON with updated product details

#### 4. Delete Product (Admin)

- **URL**: `/admin/product/:id`
- **Method**: `DELETE`
- **Description**: Deletes an existing product by its ID. Only accessible by admins.
- **Middleware**: `verifyJWT`, `authorizeRoles("admin")`
- **Response**: JSON with success message

#### 5. Get Product Details

- **URL**: `/product/:id`
- **Method**: `GET`
- **Description**: Retrieves details of a specific product by its ID.
- **Response**: JSON with product details

---

### Review Routes

#### 6. Create or Update a Review

- **URL**: `/review`
- **Method**: `PUT`
- **Description**: Allows an authenticated user to create or update a review for a product.
- **Middleware**: `verifyJWT`
- **Request Body**:
  - `productId` (string) – required
  - `rating` (number) – required
  - `comment` (string) – optional
- **Response**: JSON with success message

---

### Notes

- **Authentication Middleware (`verifyJWT`)**: This middleware is used to verify that a user is logged in by checking their JWT (JSON Web Token).
- **Authorization Middleware (`authorizeRoles`)**: This middleware checks that a user has the required roles (e.g., "admin") before granting access to the route.


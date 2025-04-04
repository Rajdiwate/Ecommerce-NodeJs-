import { axiosInstance } from "../utils/axios";

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axiosInstance.post("/login", {
      email,
      password,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Login user error:", error.response?.data || error.message);
    return error.response?.data || { error: "Login failed" };
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const { data } = await axiosInstance.post("/password/forgot", { email });
    return data;
  } catch (error) {
    console.error(
      "Forgot password error:",
      error.response?.data || error.message
    );
    return error.response?.data || { error: "Forgot password request failed" };
  }
};

export const registerUser = async ({ avatar, name, email, password }) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const { data } = await axiosInstance.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.log("register user error :", error.response.data);
    return error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await axiosInstance.get("/logout");
    return data;
  } catch (error) {
    console.log("Logout user error : ", error.response?.data);
    return error.response.data;
  }
};

export const resetPassword = async ({token , password , confirmPassword}) => {
    try {
        const {data} = await axiosInstance.put(`/password/reset/${token}` , {password, confirmPassword});
        return data
    } catch (error) {
        console.log("reset password error : " , error.response.data)
        return error.response.data
    }

}

export const getAllUsers = async function () {
  try {
      const { data } = await axiosInstance.get('/admin/users');
      console.log(data);
      return data;
  } catch (error) {
      console.error("Get users error:", error.response?.data || error.message);
      throw error; 
  }
};

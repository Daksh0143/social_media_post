const User = require("../model/user.schema");
const {
  successResponse,
  failureResponse,
} = require("../helper/api.helper.response");
const {generateJWTToken} =require("../services/bcrypt.services")

const { comparePassword } = require("../services/bcrypt.services");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password } = req.body;
    console.log(req.body, "Body");

    if (!firstName || !lastName || !email || !mobile || !password) {
      return failureResponse({ res, message: "Please Provide Al the details" });
    }

    let user = await User.findOne({
      $or: [
        {
          email: email,
        },
        { mobile: mobile },
      ],
    });
    

    if (user) {
      return failureResponse({ res, message: "User already existed" });
    } else {
      user = await User.create({
        firstName,
        lastName,
        email,
        password,
        mobile,
      });
      
      // console.log(token)
      return res.json({
        success:true,
        message:"User Register successfully",
        user,
        
      })

    }
  } catch (error) {
    console.log("Error", error);
    return failureResponse({ res, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return failureResponse({
        res,
        message: "Please Provide all the details",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return failureResponse({
        res,
        message: "User is not found",
      });
    }
    let matchPassword = await comparePassword({
      enteredPassword: password,
      password: user.password,
    });

    // console.log("Entered Password",password)
    // console.log("User Password",user.password)

    
    
    if (!matchPassword) {
      return failureResponse({
        res,
        message: "Incorrect Password",
      });
    }
    const token=generateJWTToken(user._id)
    console.log(token,"Token")
    return successResponse({
      res,
      data: {user,token},
      message: "User Logged in Successfully",
    });
  } catch (error) {
    console.log("Error", error);
    return failureResponse({ res, message: "Internal Server Error" });
  }
};

const changePassword=async(req,res)=>{
  
}
module.exports = { registerUser, loginUser };

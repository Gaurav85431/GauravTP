const { z } = require('zod');

// creating obect schema


// Login 

const loginSchema = z.object({

  email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid Email address" }).min(3, { message: "Email must be atleast of 3 characters" }).max(255, { message: "Email can't be more than 255characters" }),


  password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be atleast of 6 characters" }).max(1024, { message: "Password can't be more than 1024 characters" }),

});

// sign up

const signupSchema = loginSchema.extend({

  username: z.string({ required_error: "Name is required" }).trim().min(3, { message: "Name must be atleast of 3 characters" }).max(255, { message: "Name can't be more than 255characters" }),


  email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid Email address" }).min(3, { message: "Email must be atleast of 3 characters" }).max(255, { message: "Email can't be more than 255characters" }),


  mobile: z.string({ required_error: "Mobile is required" }).trim().min(10, { message: "Mobile Number must be atleast of 10 digits" }).max(10, { message: "Mobile number can't be more than 10 digits" }),


  password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be atleast of 6 characters" }).max(1024, { message: "Name can't be more than 1024 characters" }),


})


module.exports = {
  signupSchema,
  loginSchema

}
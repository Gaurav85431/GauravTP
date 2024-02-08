const { z } = require('zod')
// Login schema

const LoginSchema = z.object({

  email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid Email address" }).min(3, { message: "Email must be atleast of 3 characters" }).max(255, { message: "Email can't be more than 255characters" }),




  password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be atleast of 6 characters" }).max(1024, { message: "Password can't be more than 1024 characters" }),

});

module.exports = LoginSchema;
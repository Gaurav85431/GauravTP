const { z } = require('zod');

// contact 

const contactSchema = z.object({


  username: z.string({ required_error: "Name is required" }).trim().min(3, { message: "Name must be atleast of 3 characters" }).max(255, { message: "Name can't be more than 255characters" }),


  email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid Email address" }).min(3, { message: "Email must be atleast of 3 characters" }).max(255, { message: "Email can't be more than 255characters" }),



  message: z.string({ required_error: "Message is required" }).trim().min(10, { message: "Message must be atleast of 10 characters" }).max(2000, { message: "Name can't be more than 2000 characters" }),




})

module.exports = contactSchema
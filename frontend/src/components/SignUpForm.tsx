import React, { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

// Define Zod schema for sign-up validation (with uname)
const signUpSchema = z.object({
  uname: z.string().min(3, { message: 'uname must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  pass: z.string().min(6, { message: 'pass must be at least 6 characters' })
});

// Define Zod schema for sign-in validation (without uname)
const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  pass: z.string().min(6, { message: 'pass must be at least 6 characters' })
});


const SignUpForm = () => {
  const [sup, setsup] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({ uname: null, email: null, pass: null });

  const [inputs, setinputs] = useState({
    uname: '',
    email: '',
    pass: ''
  });

  const sendReq = async () => {
    try {
      console.log(inputs);
      const response = await axios.post(`https://backend.shubhamapcollege.workers.dev/api/v1/${sup ? 'signup' : 'signin'}`, inputs);

      if (sup) {
        if (response.data.email === inputs.email) {
          alert('Signup successful');
        }
      } else {
        const token: string = response.data.token;
        console.log(token);
        alert('Sign-in successful! Token: ' + token);
      }
    } catch (error) {
      console.error('Error during request:', error);
      alert('Request failed. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsFading(true); // Start fade-out animation
    setTimeout(() => {
      setsup(!sup);  // Switch content after fade-out
      setErrors({ uname: null, email: null, pass: null });
      setinputs({ uname: '', email: '', pass: '' }); // Reset inputs
      setIsFading(false); // Start fade-in animation
    }, 400); // Delay to match the fade-out duration
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Validate based on the current form type (sign-up or sign-in)
    const isValid = sup ? validateSignUp() : validateSignIn();
  
    if (isValid) {
      await sendReq();  // Proceed to send the request if validation passes
    }
  };
  
  
  const validateSignUp = () => {
    const validationResult = signUpSchema.safeParse(inputs);
    if (!validationResult.success) {
      const validationErrors = validationResult.error.format();
      setErrors({
        uname: validationErrors.uname?._errors[0] || null,
        email: validationErrors.email?._errors[0] || null,
        pass: validationErrors.pass?._errors[0] || null,
      });
      return false;  // Validation failed
    }
    setErrors({ uname: null, email: null, pass: null });
    return true;  // Validation passed
  };
  
  const validateSignIn = () => {
    const validationResult = signInSchema.safeParse(inputs);
    if (!validationResult.success) {
      const validationErrors = validationResult.error.format();
      setErrors({
        email: validationErrors.email?._errors[0] || null,
        pass: validationErrors.pass?._errors[0] || null,
      });
      return false;  // Validation failed
    }
    setErrors({ email: null, pass: null });
    return true;  // Validation passed
  };
  

  return (
    <div className="h-screen flex flex-col justify-center text-center">
      <div className={`text-4xl font-bold transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        {sup ? "Create An Account" : "Login to existing account"}
      </div>
      <div className={`text-lg text-gray-500 pt-1 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        {sup ? "Already have an account?" : "Don't have an account?... Join us now."}
        <button onClick={toggleForm} className='underline ml-2'>
          {sup ? "Login" : "Sign-Up"}
        </button>
      </div>
      <div className={`text-left pt-5 grid-rows-2 gap-4 px-1/5 lg:px-1/4 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <form onSubmit={handleSubmit}>
          {sup && (
            <div className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
              <div className="pb-2">
                <label htmlFor="username" className="font-semibold">Username</label>
              </div>
              <div>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your uname"
                  className="px-2 h-10 border-2 rounded-lg w-full"
                  value={inputs.uname}
                  onChange={(event) => setinputs({ ...inputs, uname: event.target.value })}
                />
                {errors.uname && <p className="text-red-600">{errors.uname}</p>}
              </div>
            </div>
          )}

          <div className="pb-2 pt-4">
            <label htmlFor="email" className="font-semibold">Email</label>
          </div>
          <div>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="px-2 h-10 border-2 rounded-lg w-full"
              value={inputs.email}
              onChange={(event) => setinputs({ ...inputs, email: event.target.value })}
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div className="pb-2 pt-4">
            <label htmlFor="password" className="font-semibold">Password</label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="*********"
              className="px-2 h-10 border-2 rounded-lg w-full"
              value={inputs.pass}
              onChange={(event) => setinputs({ ...inputs, pass: event.target.value })}
            />
            {errors.pass && <p className="text-red-600">{errors.pass}</p>}
          </div>

          <div>
            <button type="submit" className="w-full bg-gray-800 text-white h-10 rounded-lg mt-4">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

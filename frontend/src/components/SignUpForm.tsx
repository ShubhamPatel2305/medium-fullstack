/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { z } from 'zod';

// Define Zod schema for validation
const signUpSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

const SignUpForm = () => {
  const [sup, setsup] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({ username: null, email: null, password: null });

  const [inputs, setinputs] = useState({
    username: '',
    email: '',
    password: ''
  });

  const toggleForm = () => {
    setIsFading(true); // Start fade-out animation
    setTimeout(() => {
      setsup(!sup);  // Switch content after fade-out
      setIsFading(false); // Start fade-in animation
      setErrors({ username: null, email: null, password: null });
    }, 400); // Delay to match the fade-out duration
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate inputs using Zod schema
    const validationResult = signUpSchema.safeParse(inputs);

    if (!validationResult.success) {
      const validationErrors = validationResult.error.format();
      setErrors({
        username: validationErrors.username?._errors[0] || null,
        email: validationErrors.email?._errors[0] || null,
        password: validationErrors.password?._errors[0] || null,
      });
    } else {
      // Proceed with form submission (no errors)
      console.log('Form submitted successfully', inputs);
      setErrors({ username: null, email: null, password: null });
    }
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
                <label htmlFor="uname" className="font-semibold">Username</label>
              </div>
              <div>
                <input
                  type="text"
                  id="uname"
                  placeholder="Enter your username"
                  className="px-2 h-10 border-2 rounded-lg w-full"
                  onChange={(event) => {
                    setinputs({ ...inputs, username: event.target.value });
                  }}
                />
                {errors.username && <p className="text-red-600">{errors.username}</p>}
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
              onChange={(event) => {
                setinputs({ ...inputs, email: event.target.value });
              }}
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
              onChange={(event) => {
                setinputs({ ...inputs, password: event.target.value });
              }}
            />
            {errors.password && <p className="text-red-600">{errors.password}</p>}
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

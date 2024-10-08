import React from 'react'

const SignUpForm = () => {
  return (
    <div className="h-screen flex flex-col justify-center text-center">
      <div className="text-4xl font-bold">Create An Account</div>
      <div className="text-lg text-gray-500 pt-4">Already have an account? <a href="/login" className="underline"> Login </a> </div>
      <div className="text-left pt-5 grid-rows-2 gap-4 px-1/5  lg:px-1/4">
        <form>
        <div className="pb-2">
          <label htmlFor="uname" className="font-semibold">Username</label>
        </div>
        <div>
          <input type="text" id="uname" placeholder="Enter your username" className="px-2  h-10 border-2 rounded-lg w-full"></input>
        </div>

        <div className="pb-2 pt-4">
          <label htmlFor="uname" className="font-semibold">Email</label>
        </div>
        <div>
          <input type="text" id="uname" placeholder="Enter your email id" className="px-2  h-10 border-2 rounded-lg w-full"></input>
        </div>

        <div className="pb-2 pt-4">
          <label htmlFor="uname" className="font-semibold">Password</label>
        </div>
        <div>
          <input type="password" id="uname" placeholder="*********" className="px-2  h-10 border-2 rounded-lg w-full"></input>
        </div>

        <div>
          <button type="submit" className="w-full bg-black text-white h-10 rounded-lg mt-4">Submit</button>
        </div>
          </form>
      </div>
    </div>
  )
}

export default SignUpForm
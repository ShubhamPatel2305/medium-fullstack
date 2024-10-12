
import SignUpQuote from '../components/SignUpQuote'
import SignUpForm from '../components/SignUpForm'

const SignUp = () => {
  return (
    <div className="flex mt-16">
      <div className="flex-1 "><SignUpForm /></div>
      <div className="lg:flex lg:flex-1 hidden block:lg"><SignUpQuote /></div>
    </div>
  )
}

export default SignUp
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const Register = () => {
    return ( 
        <div className="bg-gray-100 flex h-screen items-center justify-center">
            <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Register
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Please sign up below.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" crossOrigin={""} />
          <Input type="password" size="lg" label="Password" crossOrigin={""} />
          <Input type="password" size="lg" label="Confirm Password" crossOrigin={""} />
        </div>
        <Button className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-gray-900">
            Login
          </a>
        </Typography>
      </form>
    </Card>
        </div>
    
     );
}
 
export default Register;
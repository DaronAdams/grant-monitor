import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
    return ( 
        <div className="bg-gray-100 flex h-screen items-center justify-center">
            <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Login to your account below.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" crossOrigin={""} />
          <Input type="password" size="lg" label="Password" crossOrigin={""} />
        </div>
        <Button className="mt-6" fullWidth>
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <a href="/register" className="font-medium text-gray-900">
            Register
          </a>
        </Typography>
      </form>
    </Card>
        </div>
    
     );
}
 
export default Login;
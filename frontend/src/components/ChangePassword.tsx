import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';

  
export function ChangePassword() {
  return (
    <div className="mt-2 text-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
        Change Password
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
        Change your password below.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Old Password"
              crossOrigin={''}
              name="oldPassword"
              type="password"
              required
            />
            <Input
              size="lg"
              label="New Password"
              crossOrigin={''}
              name="newPassword"
              type="password"
              required
            />
            <Input
              size="lg"
              label="Confirm Password"
              crossOrigin={''}
              name="confirmPassword"
              type="password"
              required
            />
          </div>
          <Button
            className="mt-6"
            fullWidth
            type="submit"
          >
        Change Password
          </Button>
        </form>
      </Card>
    </div>
  )
}
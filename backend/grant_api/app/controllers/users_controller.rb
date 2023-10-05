class UsersController < ApplicationController
    def create
    @user = User.new(user_params)

    if @user.save
      render json: { message: 'User registered successfully' }, status: :created
    else
      render json: { message: 'Unable to register user', errors: @user.errors.full_messages }, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end

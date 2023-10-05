class SessionsController < ApplicationController
    def create
    user = User.find_by(username: params[:username])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { message: 'Login successful' }, status: :ok
    else
      render json: { message: 'Invalid username or password' }, status: :unauthorized
    end
  end

  def check_auth
    if current_user
      render json: { authenticated: true, username: current_user.username }, status: :ok
    else
      render json: { authenticated: false }, status: :unauthorized
    end
  end

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end

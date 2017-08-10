class Api::V1::AuthController < ApplicationController
  before_action :authorize_user!, only: [:show]

  def show
    render json: {
      id: current_user.id,
      email: current_user.email
    }
  end


  def create
    # see if there is a user with this username
    user = User.find_by(email: params[:email])
    # byebug
    # if the is, make sure that they have the correct password
    if user.present?
      # && user.authenticate(params[:password])
      # if they do, render back a json response of the user info
      # issue token
      # created_jwt = issue_token({id: user.id})
      render json: {user: user}
    else
      # otherwise, render back some error response
      render json: {
        error: 'Email incorrect'
      }, status: 422
    end
  end


end

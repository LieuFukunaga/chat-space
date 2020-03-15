class MessagesController < ApplicationController
  def index
  end

  def create
    Message.create(message_params)
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id, group_id: current_group.id)
  end
end

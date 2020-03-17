class MessagesController < ApplicationController
  before_action :set_group
  before_action :set_users

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      # renderは直接viewに飛ぶ！indexでインスタンス変数を定義しても、その処理を介さない
      # よって、値を受け取れない
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_users
    @users = @group.users
  end
end

class Api::MessagesController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    group = Group.find(params[:group_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:id].to_i
    # 取得したgroup_idに合致するグループのメッセージから、idがlast_message_idよりも大きい（＝新しい）メッセージのみを取得する
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  end
end
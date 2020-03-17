# rails_helper.rb内の記述を読み込むことで共通の設定を有効にする
require 'rails_helper'

# 「Messageクラス（モデル）にあるcreateメソッドをテストするまとまり」であることを示す
RSpec.describe Message, type: :model do

  describe '#create' do
# context = "特定の条件を示す"
# 1) メッセージが保存できる場合
    context 'can save' do
      it 'is valid with body' do
        # イメージがnilでも文章（body)があればvalid
        expect(build(:message, image: nil)).to be_valid
      end

      it 'is valid with image' do
        expect(build(:message, body: nil)).to be_valid
      end

      it 'is valid with body and image' do
        expect(build(:message)).to be_valid
      end
    end

# 2) メッセージが保存できない場合
    context 'can not save' do
      it 'is invalid without body and image' do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'is invalid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end

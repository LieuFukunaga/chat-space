# 「どのような疑似グループを作成するか」を定義するための記述
FactoryBot.define do
  factory :group do
    name {Faker::Team.name}
  end
end
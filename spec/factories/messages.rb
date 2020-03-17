FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentense}
    image {File.open("#{Rails.root}/public/images/test_image.png")}
    user
    group
  end
end
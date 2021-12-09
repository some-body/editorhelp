# curl --header "Content-Type: application/json" \
#   --request POST \
#   --data '{"texts":["xyz"]}' \
#   https://d5drn1mhron55pan9vk3.apigw.yandexcloud.net/api/edit

  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"text": ["превед", "криветка"]}' \
  https://speller.yandex.net/services/spellservice.json/checkTexts
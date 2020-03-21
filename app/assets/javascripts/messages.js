$(function() {
  let last_message_id = $('.message:last').data("message-id");
  function buildHTML(message){

    // formDataにbodyとimageがある場合（＝文字と写真が投稿された場合）
    if( message.body && message.image ) {
      let html =
      `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="user-name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__body">` +
            message.body +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
      return html;
    // 文字だけの投稿の場合
    } else if (message.body) {
      let html =
      `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="user-name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__body">` +
            message.body +
          `</p>` +
        `</div>` +
      `</div>`
      return html;
    // 画像だけの投稿の場合
    } else if (message.image) {
      let html =
      `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="user-name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
      return html;
    };
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $(".main-chat__body").append(html);
      $('.main-chat__body').animate({ scrollTop: $('.main-chat__body')[0].scrollHeight});
      $("form")[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $(".submit-btn").prop('disabled', false);
    })
  })

  let reloadMessages = function () {
    let last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.').append(insertHTML);
        $('main-chat__body').animate({ scrollTop: $('main-chat__body')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert("error");
    });
  };
  // /groups/グループid/messagesをエスケープシーケンスで表現している
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
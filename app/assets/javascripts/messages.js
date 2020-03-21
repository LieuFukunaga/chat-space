$(function() {
  let last_message_id = $('.message:last').data("message-id");
  function buildHTML(data){
    let upperMessage =
    `<div class="upper-message">` +
      `<div class="user-name">` +
        message.user_name +
      `</div>` +
      `<div class="date">` +
        message.created_at +
      `</div>` +
    `</div>`

    // formDataにbodyとimageがある場合（＝文字と写真が投稿された場合）
    if( message.body && message.image ) {
      let html = `<div class="message" data-message-id=` + message.id + `>` +
        upperMessage +
        `<div class="lower-message">` +
          `<p class="lower-message__body">` +
            message.body +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`

    // 文字だけの投稿の場合
    } else if (message.body) {
      let html = `<div class="message" data-message-id=` + message.id + `>` +
        upperMessage +
        `<div class="lower-message">` +
          `<p class="lower-message__body">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`

    // 画像だけの投稿の場合
    } else if (message.image) {
      let html = `<div class="message" data-message-id=` + message.id + `>` +
        upperMessage
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  }

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
      url: "api/messagess",
      type: "get",
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(messages) {
      let insertHTML = '';
      $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
    })
    .fail(function(){
      alert("error");
    });
  };
});
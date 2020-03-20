$(function() {
  function buildHTML(message){
    if( message.image ) {
      let html =
        `<div class="message">
          <div class="upper-message">
            <div class="user-name">
              ${message.user_name}
            </div>
            <div class="time-stamp">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.body}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      let html=
      `<div class="message">
          <div class="upper-message">
            <div class="user-name">
              ${message.user_name}
            </div>
            <div class="time-stamp">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.body}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  function reactivateSubmit(){
    $(".submit-btn").prop('disabled', false);
  end
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
      activateSubmit();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      activateSubmit();
  });
  })
});
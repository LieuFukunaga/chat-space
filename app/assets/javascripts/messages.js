$(function() {
  function buildHTML(message){
    // jbuilderから返されたデータにimageが在る場合（＝画像を投稿した場合）
    if( message.image ) {
      let html =
      // ① 該当箇所をCopy element
      // ② 階層構造を整える
      // ③ <%= %>を書き換え
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
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
    })
  })
});
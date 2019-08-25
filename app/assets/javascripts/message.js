$(function(){
  function buildHTML(message){
    var content = message.is_content_present ? `${message.content} ` : ''
    var img = message.is_image_present ? `<img src='${message.image.url}'> ` : ''
    var html =
      `<div class='message' data-message-id="${message.id}">
          <div class='upper-message'>
            <div class='upper-message__user-name'>
              ${message.user_name}
            </div>
            <div class='upper-message__date'>
              ${message.date}
            </div>
          </div>
            <div class='lower-message'>
              <p class='lower-message__content'>
              ${content}
              </p>
              ${img}
            </div>
        </div>`
      return html;
      }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
      $('.form__submit').prop("disabled", false)
      $('#new_message')[0].reset();
      })
    .fail(function(){
      alert('error');
      })
  })

// 自動更新
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message').last().data('message-id');
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: location.href,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'GET',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log('success');
      })
      .fail(function() {
        console.log('error');
      });
    };

});
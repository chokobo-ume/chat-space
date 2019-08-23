$(function(){
  function buildHTML(message){
    var img = "";
    if (message.image) {
      var content = message.is_content_present ? `${message.content} ` : ''
      var image = message.is_image_present ? `<img src='${message.image.url}'> ` : ''
    }
      var html =
        `<div class='message' message_id="${message.id}">
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
                ${image}
                </p>
              </div>
          </div>`
      return html;
      }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    console.log(this)
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
      $('.form__message').val('');
      })
    .fail(function(){
      alert('error');
      })
  })
});
$(function() {

  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    search_list.append(html);
  }

  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix">
                  ${user}
                </div>`;
    search_list.append(html);
  }

  //「追加」ボタンでHTML作成
  function appendNewUser(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id} data-id=${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはありません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });

  //「追加」ボタン
  $('#user-search-result').on('click', '.user-search-add', function(){
    var id = $(this).attr("data-user-id");
    var name = $(this).attr("data-user-name");
    var addNewUser = appendNewUser(id, name);
    $('#chat-group-users').append(addNewUser);
    $(this).parent().remove();
  });

  //メンバー削除
  $("#chat-group-users").on("click",".user-search-remove", function() {
    $(this).parent().remove();
    });
});
function roleUser(){
    $.ajax({
        type:"GET",
        url: "/user/getUser"
    }).done(function (user){
		if(user.authorities[0] === "カウンセラー"){
			$(".back_out").on("click",function(){
				window.location.href = "/posts/student-detail"
				localStorage.removeItem("postId");
			})
			$("#form-by-role").html(`
			   <textarea id=add_comment class="form-control"  cols="50" rows="3" placeholder="...コメント追加" data-emojiable="true" data-emoji-input="unicode" value=""></textarea>
	           <div id="hashtagDisplay" class="d-none">
	               <ul id="hashtagList" class="list-group">
	
	               </ul>
	           </div>
			`);
		}
		
		if(user.authorities[0] === "家族"){
			$(".back_out").on("click",function(){
				window.location.href = "/posts/student-detail-parent"
				localStorage.removeItem("postId");
			})
			$("#form-by-role").html(`
			   <textarea class="form-control" id="add_comment" cols="50" rows="3" placeholder="...コメント追加" data-emojiable="true" data-emoji-input="unicode" value=""></textarea>
			`);
		}
		if(user.authorities[0] === "先生"){
			$(".back_out").on("click",function(){
				window.location.href = "/posts/student-detail-teacher"
				localStorage.removeItem("postId");
			})
			$("#form-by-role").html(`
			   <textarea class="form-control" id="add_comment" cols="50" rows="3" placeholder="...コメント追加" data-emojiable="true" data-emoji-input="unicode" value=""></textarea>
			`);
		}
		if(user.authorities[0] === "学生"){
			$(".back_out").on("click",function(){
				window.location.href = "/student"
				localStorage.removeItem("postId");
			})
			$("#form-by-role").html(`
			   <textarea class="form-control" id="add_comment" cols="50" rows="3" placeholder="...コメント追加" data-emojiable="true" data-emoji-input="unicode" value=""></textarea>
			`);
		}
    })
}

roleUser();
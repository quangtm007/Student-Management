App.getUser();

function getUserDetail(){
	$.ajax({
		type:"GET",
		url: "/user/getUser"
    }).done(function (user){
		$.ajax({
		    type: "GET",
		    url: `/user/${user.userId}`
	    }).done(function (users){
	        let content = "";
	        content += `
	            <img alt="" src="/assets/images/${users.avatar}" class="rounded-circle">
				</br>
				<div class="title_user">${users.role.code}</div>
	        `;
		    $("#image_comment").html(content);
	   })
	})
}

function getPostDetail(){
	let id = localStorage.getItem("postId");
	$.ajax({
	    type: "GET",
	    url: `/posts/post-detail/${id}`
    }).done(function(post){
		let content = "";
		content += `
            <option>${post.event.event_name}</option>
        `;
		$("#work_completed").val(post.work_completed);
		$("#action").val(post.action);
		$("#power").val(post.power);
		$("#capacity").val(post.capacity);
		$("#think").val(post.think);
		$("#event").html(content);
	})
}

function getAllComment(){
	let post = localStorage.getItem("postId");
	$.ajax({
		type:"GET",
		url: "/user/getUser"
	}).done(function (user){
		$.ajax({
			type:"GET",
			url: `/user/${user.userId}`
		}).done(function(user1){
			$.ajax({
				type:"GET",
				url: `/comment/post/${post}`
			}).done(function (comments){
				let content = "";
				for (let i = 0; i < comments.length; i++) {
					if(user1.username === comments[i].user.username){
						content += `
							<div class="content_comment" id="row${comments[i].cmt_id}">
								<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${comments[i].cmt_id}">	
								<div class="content-right">
									<div class="text-right custom">
										<div class="comment">
											<textarea class="comment" disabled rows="2" cols="30">${comments[i].content}</textarea>
											<span class="text-left d-flex hours">${timeAgo(comments[i].updateAt)}</span>
											<div class="edit"><button value="${comments[i].cmt_id}" class="btn edit-button"><i class="fa fa-pencil"></i></button></div>
											<div class="delete"><button value="${comments[i].cmt_id}" class="btn delete-button"><i class="far fa-trash-alt"></i></button></div>
										</div>
									</div>
									<div class="text-center image_content_right">
										<img alt="" src="/assets/images/${comments[i].user.avatar}" class="rounded-circle">
											</br>
											<div class="title_user">${comments[i].user.role.code}</div>
									</div>
								</div>
							</div>
						`;
					} else{
						content += `
						<div class="content_comment" id="row${comments[i].cmt_id}">
							<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${comments[i].cmt_id}">	
							<div class="content-left">
								<div class="text-center image_content_left">
									<img alt="" src="/assets/images/${comments[i].user.avatar}" class="rounded-circle">
									</br>
									<div class="title_user">${comments[i].user.role.code}</div>
								</div>
								<div class="custom">
									<div class="comment" id="comment">
										<textarea class="comment" disabled rows="2" cols="30">${comments[i].content}</textarea>
										<span class = "d-flex hours">${timeAgo(comments[i].updateAt)}</span>
									</div>
								</div>
							</div>
						</div>
					`;
					}
				}
				$("#text_comment").html(content);
				$(".edit-button").on("click",function (){
					let id = $(this).attr("value");
					editComment(id);
					$("#create_comment").addClass("hidden");
					$("#update_comment").removeClass("hidden");
				})

				$(".delete-button").on("click",function (){
					let id = $(this).attr("value");
					deleteConfirm(id);
				})

				$("#cancel").html("");
				$("#create_comment").removeClass("hidden");
				$("#update_comment").addClass("hidden");
			}).fail(() =>{
				App.showErrorAlert("エラーが発生しました");
			})
		})
	})
}

function createComment(){
	$.ajax({
		type:"GET",
		url: "/user/getUser"
	}).done(function (user){
		if(user.authorities[0] === "カウンセラー"){
			$.ajax({
				type:"GET",
				url: `/user/${user.userId}`
			}).done(function(user1){
				let content = $("#input").text();
				let user_id = user1.id;
				let post = localStorage.getItem("postId");

				let newUser = {
					id: user_id
				}

				let newPost = {
					post_id: post
				}

				let comment = {
					content:content,
					user:newUser,
					post:newPost
				}

				$.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: "POST",
					data: JSON.stringify(comment),
					url: "/comment/create-comment"
				}).done((resp) =>{
					stompClient.send("/app/chat.createComment", {}, JSON.stringify(resp))
				}).fail(() =>{
					App.showErrorAlert("エラーが発生しました");
				})
			})
		} else {
			$.ajax({
				type:"GET",
				url: "/user/getUser"
			}).done(function (user){
				$.ajax({
					type:"GET",
					url: `/user/${user.userId}`
				}).done(function(user1){
					let content = $("#input").text();
					let user = user1.id;
					let post = localStorage.getItem("postId");

					let newUser = {
						id: user
					}

					let newPost = {
						post_id: post
					}

					let comment = {
						content:content,
						user:newUser,
						post:newPost
					}

					$.ajax({
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						type: "POST",
						data: JSON.stringify(comment),
						url: "/comment/create-comment"
					}).done((resp) =>{
						stompClient.send("/app/chat.createComment", {}, JSON.stringify(resp))
					}).fail(() =>{
						App.showErrorAlert("エラーが発生しました");
					})
				})
			})
		}
	})
}

function editComment(postId){
	$.ajax({
		type: "GET",
		url: `/comment/edit-comment/${postId}`
	}).done(function(comment){
		$("#cmt_id").val(comment.cmt_id);
		$("#input").text(comment.content);
		$("#cancel").html(`
			<div class="send">
				<button class="btn cancel_comment" id="cancel_comment"><i class="fa fa-times"></i></button>
			</div>
		`);
		$("#cancel_comment").on("click",function(){
			$("#create_comment").removeClass("hidden");
			$("#update_comment").addClass("hidden");
			$("#cancel_comment").addClass("hidden");
			$("#cancel").html("");
			$("#input").html("");
		})
	})
}

// Save data after change comment
function saveChangeComment(){
	let cmt_id = $("#cmt_id").val();
	$.ajax({
		type:"GET",
		url: "/user/getUser"
	}).done(function (user){
		$.ajax({
			type:"GET",
			url: `/user/${user.userId}`
		}).done(function(user1){
			let content = $("#input").text();
			let user = user1.id;
			let post = localStorage.getItem("postId");

			let newUser = {
				id: user
			}

			let newPost = {
				post_id: post
			}

			let comment = {
				content:content,
				user:newUser,
				post:newPost
			}
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: "PUT",
				data: JSON.stringify(comment),
				url: `/comment/edit/${cmt_id}`,
			}).done(function(comment){
				// delete comment table post detail
				$.ajax({
					type: "DELETE",
					url: `/postDetail/delete-post-detail/${comment.cmt_id}/${comment.post.post_id}`
				}).done(function(){
					stompClient.send("/app/chat.editComment", {}, JSON.stringify(comment))

				}).fail(() =>{
					App.showErrorAlert("エラーが発生しました");
				})
			})
		})
	})
}

function deleteConfirm(commentId) {
	App.showHideConfirmDialog().then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				type: "DELETE",
				url: `/comment/${commentId}`
			}).done(function(){
				$.ajax({
					type: "DELETE",
					url: `/postDetail/delete/${commentId}`
				}).done(function(){
					$.ajax({
						type: "DELETE",
						url: `/notifications/delete/${commentId}`
					}).done(function(){
						let commentDTO = {
							id: commentId,
							username: parseJwt(getCookie("JWT")).user.username
						}
						stompClient.send("/app/chat.deleteComment", {}, JSON.stringify(commentDTO));
					})
				})
			})
		}
	})
}

function saveNotification(){
	let post_id = localStorage.getItem("postId");
	$.ajax({
		type:"GET",
		url: "/user/getUser"
	}).done(function (user){
		$.ajax({
			type:"GET",
			url: `/user/${user.userId}`
		}).done(function(user1){
			$.ajax({
				type:"GET",
				url: `/comment/post/${post_id}`
			}).done(function (comments){

				for(let i = 0; i < comments.length; i++){
					let user_id = user1.id;
					let cmt_id = comments[i].cmt_id;

					let notification = {
						user_id: user_id,
						cmt_id: cmt_id,
						post_id: post_id
					}

					$.ajax({
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						type: "POST",
						data: JSON.stringify(notification),
						url: "/notifications/insert"
					})
				}
			})
		})
	})
}

/*setInterval(saveNotification, 2000);*/

$(".create_comment").on("click",createComment);
$(".update_comment").on("click",saveChangeComment);

saveNotification()
getAllComment()
getUserDetail();
getPostDetail();

//REAL TIME COMMENT

let stompClient = null;

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function parseJwt (token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

createCommentRealTime();

function createCommentRealTime() {
	let socket = new SockJS("/ws");
	stompClient = Stomp.over(socket);
	stompClient.connect({}, onConnected, onError);
}

function onCreateMessageReceived(payload) {
	let resp = JSON.parse(payload.body)

	let user_reiceived = parseJwt(getCookie("JWT")).user.username;

	if(resp.user.username === user_reiceived){
		if (resp.user.role.code === "カウンセラー"){
			$.ajax({
				type:"GET",
				async:false,
				url: "/factorials/list-factorial"
			}).done(function (factorial){
				let strArr =[]
				strArr = resp.content.split(" ");
				let factorial_hashtag = "";
				let count = 0;
				let check;
				for(let i = 0; i < factorial.length; i++){
					for(let j = 0; j < strArr.length; j++){
						if(factorial[i].factorial_hashtag === strArr[j]){
							factorial_hashtag = strArr[j].slice(1);
							$.ajax({
								type:"GET",
								async:false,
								url: `/factorials/factorial-hashtag/${factorial_hashtag}`
							}).done(function(factorial){
								let factorial_id = factorial.factorial_id;
								let postDetail = {
									user_id: resp.user.id,
									post_id: resp.post.post_id,
									cmt_id: resp.cmt_id,
									factorial_id: factorial_id
								}
								$.ajax({
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json'
									},
									type: "POST",
									async:false,
									data: JSON.stringify(postDetail),
									url: "/postDetail/insert"
								})
							})
						}
						count++;
					}
				}
				if(count === 0){
					let postDetail = {
						user_id:resp.user.id,
						post_id:resp.post.post_id,
						cmt_id: resp.cmt_id,
					}
					$.ajax({
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						type: "POST",
						data: JSON.stringify(postDetail),
						url: "/postDetail/insert"
					})
				}


				let notification = {
					user_id: resp.user.id,
					cmt_id: resp.cmt_id,
					post_id: resp.post.post_id
				}

				$.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: "POST",
					data: JSON.stringify(notification),
					url: "/notifications/insert"
				})

				$('#text_comment').append(`
				<div class="content_comment" id="row${resp.cmt_id}">
					<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${resp.cmt_id}">
					<div class="content-right">
						<div class="text-right custom">
							<div class="comment">
								<textarea disabled class="comment" rows="2" cols="30">${resp.content}</textarea>
								<span class="text-left d-flex hours">${timeAgo(resp.updateAt)}</span>
								<div class="edit"><button value="${resp.cmt_id}" class="btn edit-button"><i class="fa fa-pencil"></i></button></div>
								<div class="delete"><button value="${resp.cmt_id}" class="btn delete-button"><i class="far fa-trash-alt"></i></button></div>
							</div>
						</div>
						<div class="text-center image_content_right">
							<img alt="" src="/assets/images/${resp.user.avatar}" class="rounded-circle">
								</br>
								<div class="title_user">${resp.user.role.code}</div>
						</div>
					</div>
				</div>`);
				$(".emoji-wysiwyg-editor").html("")
				$(".edit-button").on("click",function (){
					let id = $(this).attr("value");
					editComment(id);
					$("#create_comment").addClass("hidden");
					$("#update_comment").removeClass("hidden");
				})

				$(".delete-button").on("click",function (){
					let id = $(this).attr("value");
					deleteConfirm(id);
				})
				App.showSuccessAlert("成功したコメント");
			})
		} else {
			let notification = {
				user_id: resp.user.id,
				cmt_id: resp.cmt_id,
				post_id: resp.post.post_id
			}

			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: "POST",
				data: JSON.stringify(notification),
				url: "/notifications/insert"
			})

			$('#text_comment').append(`
				<div class="content_comment" id="row${resp.cmt_id}">
					<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${resp.cmt_id}">
					<div class="content-right">
						<div class="text-right custom">
							<div class="comment">
								<textarea disabled class="comment" rows="2" cols="30">${resp.content}</textarea>
								<span class="text-left d-flex hours">${timeAgo(resp.updateAt)}</span>
								<div class="edit"><button value="${resp.cmt_id}" class="btn edit-button"><i class="fa fa-pencil"></i></button></div>
								<div class="delete"><button value="${resp.cmt_id}" class="btn delete-button"><i class="far fa-trash-alt"></i></button></div>
							</div>
						</div>
						<div class="text-center image_content_right">
							<img alt="" src="/assets/images/${resp.user.avatar}" class="rounded-circle">
								</br>
								<div class="title_user">${resp.user.role.code}</div>
						</div>
					</div>
				</div>`);
			$(".emoji-wysiwyg-editor").html("")
			$(".edit-button").on("click",function (){
				let id = $(this).attr("value");
				editComment(id);
				$("#create_comment").addClass("hidden");
				$("#update_comment").removeClass("hidden");
			})

			$(".delete-button").on("click",function (){
				let id = $(this).attr("value");
				deleteConfirm(id);
			})
			App.showSuccessAlert("成功したコメント");
		}
	} else {
		$('#text_comment').append(`
			<div class="content_comment" id="row${resp.cmt_id}">
				<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${resp.cmt_id}">
				<div class="content-left">
					<div class="text-center image_content_left">
						<img alt="" src="/assets/images/${resp.user.avatar}" class="rounded-circle">
						</br>
						<div class="title_user">${resp.user.role.code}</div>
					</div>
					<div class="custom">
						<div class="comment" id="comment">
							<textarea class="comment" disabled rows="2" cols="30">${resp.content}</textarea>
							<span class="d-flex hours">${timeAgo(resp.updateAt)}</span>
						</div>
					</div>
				</div>
			</div>`);
		$(".emoji-wysiwyg-editor").html("")
		$(".edit-button").on("click",function (){
			let id = $(this).attr("value");
			editComment(id);
			$("#create_comment").addClass("hidden");
			$("#update_comment").removeClass("hidden");
		})

		$(".delete-button").on("click",function (){
			let id = $(this).attr("value");
			deleteConfirm(id);
		})
		saveNotification();
	}
}

function onEditMessageReceived(payload){
	let comment = JSON.parse(payload.body);

	if(comment.user.role.code === "カウンセラー"){
		// save data in the comment table for the role is doctor
		$.ajax({
			type:"GET",
			async: false,
			url: "/factorials/list-factorial"
		}).done(function (factorial){
			let strArr =[]
			strArr = comment.content.split(" ");
			let factorial_hashtag = "";
			let count = 0;
			for(let i = 0; i < factorial.length; i++){
				for(let j = 0; j < strArr.length; j++){
					if(factorial[i].factorial_hashtag === strArr[j]){
						factorial_hashtag = strArr[j].slice(1);
						$.ajax({
							type:"GET",
							url: `/factorials/factorial-hashtag/${factorial_hashtag}`
						}).done(function(factorial){
							let factorial_id = factorial.factorial_id;
							let postDetail = {
								user_id: comment.user.id,
								post_id: comment.post.post_id,
								cmt_id: comment.cmt_id,
								factorial_id: factorial_id
							}
							$.ajax({
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								type: "POST",
								data: JSON.stringify(postDetail),
								url: "/postDetail/insert"
							}).done(function(){
								console.log("1233234657")
							})
						})
					}
					count++;
				}
			}
			if(count === 0){
				let postDetail = {
					user_id:comment.user.id,
					post_id:comment.post.post_id,
					cmt_id: comment.cmt_id,
				}
				$.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					type: "POST",
					data: JSON.stringify(postDetail),
					url: "/postDetail/insert"
				}).done(function(){
					console.log("ágdhrth")
				})
			}
			$('#row'+comment.cmt_id+ ' input').remove();
			if (comment.user.username === parseJwt(getCookie("JWT")).user.username){
				$('#row'+comment.cmt_id).html(`
					<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${comment.cmt_id}">
					<div class="content-right">
						<div class="text-right custom">
							<div class="comment">
								<textarea disabled class="comment" rows="2" cols="30">${comment.content}</textarea>
								<span class= "text-left d-flex hours">${timeAgo(comment.updateAt)}</span>
								<div class="edit"><button value="${comment.cmt_id}" class="btn edit-button"><i class="fa fa-pencil"></i></button></div>
								<div class="delete"><button value="${comment.cmt_id}" class="btn delete-button"><i class="far fa-trash-alt"></i></button></div>
							</div>
						</div>
						<div class="text-center image_content_right">
							<img alt="" src="/assets/images/${comment.user.avatar}" class="rounded-circle">
								</br>
								<div class="title_user">${comment.user.role.code}</div>
						</div>
					</div>
				`);
				$(".emoji-wysiwyg-editor").html('');
				$(".edit-button").on("click",function (){
					let id = $(this).attr("value");
					editComment(id);
					$("#create_comment").addClass("hidden");
					$("#update_comment").removeClass("hidden");
				})
				$(".delete-button").on("click",function (){
					let id = $(this).attr("value");
					deleteConfirm(id);
				})
				$("#cancel").html("");
				$("#create_comment").removeClass("hidden");
				$("#update_comment").addClass("hidden");

				App.showSuccessAlert("更新に成功");
			} else {
				$('#row' + comment.cmt_id).html(`
					<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${comment.cmt_id}">
					<div class="content-left">
						<div class="text-center image_content_left">
							<img alt="" src="/assets/images/${comment.user.avatar}" class="rounded-circle">
							</br>
							<div class="title_user">${comment.user.role.code}</div>
						</div>
						<div class="custom">
							<div class="comment" id="comment">
								<textarea class="comment" disabled rows="2" cols="30">${comment.content}</textarea>
								<span class="d-flex hours">${timeAgo(comment.updateAt)}</span>
							</div>
						</div>
					</div>
				`);
			}
		}).fail(() =>{
			App.showErrorAlert("エラーが発生しました");
		})
	} else {
		if (comment.user.username === parseJwt(getCookie("JWT")).user.username){
			$('#row'+comment.cmt_id).html(`
					<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${comment.cmt_id}">
					<div class="content-right">
						<div class="text-right custom">
							<div class="comment">
								<textarea disabled class="comment" rows="2" cols="30">${comment.content}</textarea>
								<span class= "text-left d-flex hours">${timeAgo(comment.updateAt)}</span>
								<div class="edit"><button value="${comment.cmt_id}" class="btn edit-button"><i class="fa fa-pencil"></i></button></div>
								<div class="delete"><button value="${comment.cmt_id}" class="btn delete-button"><i class="far fa-trash-alt"></i></button></div>
							</div>
						</div>
						<div class="text-center image_content_right">
							<img alt="" src="/assets/images/${comment.user.avatar}" class="rounded-circle">
								</br>
								<div class="title_user">${comment.user.role.code}</div>
						</div>
					</div>
				`);
			$(".emoji-wysiwyg-editor").html('');
			$(".edit-button").on("click",function (){
				let id = $(this).attr("value");
				editComment(id);
				$("#create_comment").addClass("hidden");
				$("#update_comment").removeClass("hidden");
			})
			$(".delete-button").on("click",function (){
				let id = $(this).attr("value");
				deleteConfirm(id);
			})
			$("#cancel").html("");
			$("#create_comment").removeClass("hidden");
			$("#update_comment").addClass("hidden");

			App.showSuccessAlert("更新に成功");
		} else {
			$('#row' + comment.cmt_id).html(`
				<input type="text" hidden class="form-control" id="cmt_id" name="cmt_id" value="${comment.cmt_id}">
				<div class="content-left">
					<div class="text-center image_content_left">
						<img alt="" src="/assets/images/${comment.user.avatar}" class="rounded-circle">
						</br>
						<div class="title_user">${comment.user.role.code}</div>
					</div>
					<div class="custom">
						<div class="comment" id="comment">
							<textarea class="comment" disabled rows="2" cols="30">${comment.content}</textarea>
							<span class="d-flex hours">${timeAgo(comment.updateAt)}</span>
						</div>
					</div>
				</div>
			`);
		}
	}
}

function onDeleteMessageReceived(payload){
	let commentDTO = JSON.parse(payload.body)
	$("#row" + commentDTO.id).remove();
	if (commentDTO.username === parseJwt(getCookie("JWT")).user.username){
		App.showSuccessAlert("コメントを正常に削除する!")
	}

}

function onConnected() {
	stompClient.subscribe('/topic/public', onCreateMessageReceived);
	stompClient.subscribe('/topic/edit', onEditMessageReceived);
	stompClient.subscribe('/topic/delete', onDeleteMessageReceived);
}

function onError() {
	console.log('WebSocketサーバーに接続できませんでした。このページを更新して再試行してください');
}
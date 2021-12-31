App.getUser();

$(".back_out").on("click",function(){
	window.location.href = "/login"
})

// Search by class, event, status
function searchEventsOfStudent() {
	let eId = $('#eventList :selected').val();
	let cId = $('#classList :selected').val();
	let statusList = [];
	$('input[name="status"]:checked').each(function() {
		statusList.push(this.value);
	});
	let sts1 = statusList[0];
	let sts2 = statusList[1];
	let sts3 = statusList[2];

	var url = "/posts/search?eventId=" + eId + "&classId=" + cId;
	if (sts1 != null && sts2 != null && sts3 != null) {
		url += "&status=" + encodeURIComponent(sts1) + "&status2=" + encodeURIComponent(sts2) + "&status3=" + encodeURIComponent(sts3);
	}else if (sts1 != null && sts2 != null ){
		url += `&status=${encodeURIComponent(sts1)}&status2=${encodeURIComponent(sts2)}`
	}else if(sts2 != null && sts3 != null ){
		url += `&status=${encodeURIComponent(sts2)}&status2=${encodeURIComponent(sts3)}`
	}else if(sts1 != null && sts3 != null){
		url += `&status=${encodeURIComponent(sts1)}&status2=${encodeURIComponent(sts3)}`

	}else {
		if (sts1 != null && sts1 != "")
			url += "&status=" + encodeURIComponent(sts1);

		if (sts2 != null && sts2 != "")
			url += "&status=" + encodeURIComponent(sts2);

		if (sts3 != null && sts3 != "")
			url += "&status=" + encodeURIComponent(sts3);
	}
	$.ajax({
		type: "GET",
		url: url
	}).done(function(events) {
		let content = "";
		for (let i = 0; i <= events.length - 1; i++) {

			let count = 0;
			$.ajax({
				type: "GET",
				async: false,
				url: `/notifications/list-comment/${events[i].postId}/${events[i].userId}`
			}).done(function (post1) {
				$.ajax({
					type: "GET",
					async: false,
					url: `/comment/post/${events[i].postId}`
				}).done(function (comments) {
					count = comments.length - post1.length;
				})
			})
			if (count === 0) {
				content += `
					<tr id="row${events[i].postId}" class="text-center">
					  <input hidden id="post_id" value="${events[i].postId}">
					  <td>${events[i].className}</td>
					  <td class="text-left"><i class="${events[i].eventIcon} icon"></i>  ${events[i].eventName}</td>
					  <td><p class='btn ${events[i].status === "未確認" ? 'btn-primary' : (events[i].status === "確認中" ? 'btn-warning' : 'btn-success')}'>
						${events[i].status}</p>
					  </td>
					  <td>
						<a href="/posts/post-detail" class="notification" style="text-decoration: none" onclick=postDetail(${events[i].postId})><i class="fas fa-bell"></i></a>
					  </td>
					  <td>						 						 
						 <a class="${(events[i].status === "修了") ? '  btn disabled' : 'btn edit-button '}" href="/post/edit/${events[i].postId}" onclick=postDetail(${events[i].postId}) >                     
							 <i class="far fa-edit"></i>
						 </a>
						 <button class="${(events[i].status === "修了") ? '  btn disabled' : 'btn delete-button '}"  value="${events[i].postId}" >
							 <i class="fas fa-trash-alt"></i>
						 </button>
					  </td>
					</tr>
				`;
			} else {
				content += `
					<tr id="row${events[i].postId}" class="text-center">
					  <input hidden id="post_id" value="${events[i].postId}">
					  <td>${events[i].className}</td>
					  <td class="text-left"><i class="${events[i].eventIcon} icon"></i>  ${events[i].eventName}</td>
					  <td><p class='btn ${events[i].status === "未確認" ? 'btn-primary' : (events[i].status === "確認中" ? 'btn-warning' : 'btn-success')}'>
						${events[i].status}</p>
					  </td>
					  <td>
						<a href="/posts/post-detail" class="notification" style="text-decoration: none" onclick=postDetail(${events[i].postId})><i class="fas fa-bell"></i></i><span class="badge">${count}</span></a>
					  </td>
					  <td>						 						 
						 <a class="${(events[i].status === "修了") ? '  btn disabled' : 'btn edit-button '}" href="/post/edit/${events[i].postId}" onclick=postDetail(${events[i].postId}) >                     
							 <i class="far fa-edit"></i>
						 </a>
						 <button class="${(events[i].status === "修了") ? '  btn disabled' : 'btn delete-button '}"  value="${events[i].postId}" >
							 <i class="fas fa-trash-alt"></i>
						 </button>
					  </td>
					</tr>
				`;
			}
		}

		$("#postList tbody").html(content);

		$(".delete-button").on("click", function() {
			App.showDeleteConfirmDialog().then((result) => {
				if (result.isConfirmed) {
					let id = $(this).attr("value");
					$("#postList").DataTable().clear().destroy();
					deleteConfirm(id);
				}
			});
		})

		if (content === ""){
			$("#postList").DataTable({
				"searching": false,
				"ordering": false,
				"bInfo": false,
				"bLengthChange": false,
				"paging": false,
				"language":{
					"url": "//cdn.datatables.net/plug-ins/1.11.3/i18n/ja.json"
				}
			})
		} else {
			$("#postList").DataTable({
				"searching": false,
				"ordering": false,
				"bInfo": false,
				"bLengthChange": false,
				"pageLength": 10,
				"language":{
					"paginate": {
						"next": ">>",
						"previous": "<<"
					},
				}
			})
		}
	})
}

// Returns a list of 1 student's events
function getAllListEvent(){
	console.log("2");
	let content = "";
	$.ajax({
		type: "GET",
		url: "/user/getUser"
	}).done(function(user) {
		$.ajax({
		    type: "GET",
			async: false,
		    url: `/posts/student-detail/${user.userId}`
	    }).done(function (post){
			for(let i = 0; i < post.length ; i++) {
				let count = 0;
				$.ajax({
					type: "GET",
					async: false,
					url: `/notifications/list-comment/${post[i].post_id}/${user.userId}`
				}).done(function (post1) {
					$.ajax({
						type: "GET",
						async: false,
						url: `/comment/post/${post[i].post_id}`
					}).done(function (comments) {
						count = comments.length - post1.length;
					})
				})

				if (count === 0) {
					content += `
						<tr id="row${post[i].post_id}" class="text-center">
						  <input hidden id="post_id" value="${post[i].post_id}">
						  <td>${post[i].class_name}</td>
						  <td class="text-left"><i class="${post[i].event_icon} icon"></i>  ${post[i].event_name}</td>
						  <td><p class='btn ${post[i].status === "未確認" ? 'btn-primary' : (post[i].status === "確認中" ? 'btn-warning' : 'btn-success')}'>
							${post[i].status}</p>
						  </td>
						  <td>
							<a href="/posts/post-detail" class="notification" style="text-decoration: none" onclick=postDetail(${post[i].post_id})><i class="fas fa-bell"></i></a>
						  </td>
						  <td>						 						 
							 <a class="${(post[i].status === "修了") ? '  btn disabled' : 'btn edit-button '}" href="/post/edit/${post[i].post_id}" onclick=postDetail(${post[i].post_id}) >                     
								 <i class="far fa-edit"></i>
							 </a>
					   
							 <button class="${(post[i].status === "修了") ? '  btn disabled' : 'btn delete-button '}" value="${post[i].post_id}" >
								 <i class="fas fa-trash-alt"></i>
							 </button>
						  </td>
						</tr>
					`;
				} else {
					content += `
						<tr id="row${post[i].post_id}" class="text-center">
						  <input hidden id="post_id" value="${post[i].post_id}">
						  <td>${post[i].class_name}</td>
						  <td class="text-left"><i class="${post[i].event_icon} icon"></i>  ${post[i].event_name}</td>
						  <td><p class='btn ${post[i].status === "未確認" ? 'btn-primary' : (post[i].status === "確認中" ? 'btn-warning' : 'btn-success')}'>
							${post[i].status}</p>
						  </td>
						  <td>
							<a href="/posts/post-detail" class="notification" style="text-decoration: none" onclick=postDetail(${post[i].post_id})><i class="fas fa-bell"></i></i><span class="badge">${count}</span></a>
						  </td>
						  <td>						 						 
							 <a class="${(post[i].status === "修了") ? '  btn disabled' : 'btn edit-button '}" href="/post/edit/${post[i].post_id}" onclick=postDetail(${post[i].post_id}) >                     
								 <i class="far fa-edit"></i>
							 </a>
							 <button class="${(post[i].status === "修了") ? '  btn disabled' : 'btn delete-button '}"  value="${post[i].post_id}" >
								 <i class="fas fa-trash-alt"></i>
							 </button>
						  </td>
						</tr>
					`;
				}
			}
			$("#postList tbody").html(content);

			$(".delete-button").on("click", function() {
				App.showDeleteConfirmDialog().then((result) => {
					if (result.isConfirmed) {
						let id = $(this).attr("value");
						$("#postList").DataTable().clear().destroy();
						deleteConfirm(id);
					}
				});
			})

			if (post.length === 0){
				$("#postList").DataTable({
					"searching": false,
					"ordering": false,
					"bInfo": false,
					"bLengthChange": false,
					"paging": false,
					"language":{
						"url": "//cdn.datatables.net/plug-ins/1.11.3/i18n/ja.json"
					}
				})
			} else {
				$("#postList").DataTable({
					"searching": false,
					"ordering": false,
					"bInfo": false,
					"bLengthChange": false,
					"pageLength": 10,
					"language":{
						"paginate": {
							"next": ">>",
							"previous": "<<"
						},
					}
				})
			}
		})
	})
}

// save data on local storage
function postDetail(id){
	localStorage.setItem("postId",id);
}

// get value list events
function getAllEvent() {
	$.ajax({
		type: "GET",
		url: "/event/list-event"
	}).done(function(events) {
		let content = "<option value='0'> イベント </option>";
		for (let i = 0; i < events.length; i++) {
			content += `
                    <option value="${events[i].event_id}">${events[i].event_name}</option>
                `;
		}
		$("#eventList").html(content);
	})
}

//get value list classes
function getAllClass() {
	$.ajax({
		type: "GET",
		url: "/class/list-class"
	}).done(function(classes) {

		let content = "<option value='0'> グレード </option>";
		for (let i = 0; i < classes.length; i++) {
			content += `
                <option value="${classes[i].class_id}">${classes[i].class_name}</option>
            `;
		}
		$("#classList").html(content);
	})
}

//delete post
function deleteConfirm(id) {
	$.ajax({
		type: "GET",
		url: `/comment/post/${id}`
	}).done(function (post){
		for (let i = 0; i < post.length; i++) {
			$.ajax({
				type: "DELETE",
				url: `/comment/${post[i].cmt_id}`
			})
		}
		$.ajax({
			type: "DELETE",
			url: `/user-class-post/delete-post/${id}`
		}).done(function(){
			$.ajax({
				type: "DELETE",
				url: `/notifications/delete-post/${id}`
			}).done(function(){
				$.ajax({
					type: "DELETE",
					url: `/postDetail/delete-post/${id}`
				}).done(function(){
					$.ajax({
						type: "DELETE",
						url: `/posts/supend/${id}`
					}).done(function() {
						$("#row" + id).remove();
						App.showSuccessAlert("削除完了")
						getAllListEvent();
					}).fail(function() {
						App.showErrorAlert("エラー !")
					})
				})
			})
		})
	})
}

$(".button_add").on("click", function() {
	window.location.href = "/create-post"
});

$("#searchBtn").on("click", function(){
	$("#postList").DataTable().clear().destroy();
	searchEventsOfStudent();
});

getAllClass();
getAllListEvent();
getAllEvent();
App.getUser();

$(".back_out").on("click",function(){
	window.location.href = "/doctor"
	localStorage.removeItem("studentId");
})

$(".page_student").on("click",function(){
	window.location.href="/posts/student-detail"
})

//get value list classes
function getAllClass() {
	$.ajax({
		type: "GET",
		url: "/class/list-class"
	}).done(function(classes) {
		let content = "";
		content += `<option value="" selected>学年</option>`;
		for (let i = 0; i < classes.length; i++) {
			content += `
				<option value="${classes[i].class_id}">${classes[i].class_name}</option>
			`;
		}
		$("#classes").html(content);
	})
}

// get value list events
function getAllEvent() {
	$.ajax({
		type: "GET",
		url: "/event/list-event"
	}).done(function(events) {
		let content = "";
		content += `<option value="" selected>イベント</option>`;
		for (let i = 0; i < events.length; i++) {
			content += `
				<option value="${events[i].event_id}">${events[i].event_name}</option>
			`;
		}
		$("#events").html(content);
	})
}

// Returns student details
function getStudentDetail(){
	let id = localStorage.getItem("studentId");
	$.ajax({
	    type: "GET",
	    url: `/user/${id}`
    }).done(function (users){
        let content = "";
        content += `
            <div>${users.fullName}</div>
            <div style="margin: 0 100px">${users.user_code}</div>
            <div>${users.aclass.class_name}</div>
        `;
	    $("#student_detail").html(content);
   })	
}

// Returns a list of 1 student's events
function getAllListEvent(){
	console.log("2");
	let id = localStorage.getItem("studentId");
	let content = "";
	$.ajax({
	    type: "GET",
		async: false,
	    url: `/posts/student-detail/${id}`
    }).done(function (post){
		for(let i = 0; i < post.length ; i++) {
			let count = 0;
			$.ajax({
				type:"GET",
				async: false,
				url: "/user/getUser"
			}).done(function (user){
				$.ajax({
					type: "GET",
					async: false,
					url: `/comment/post/${post[i].post_id}`
				}).done(function (comments) {
					$.ajax({
						type: "GET",
						async: false,
						url: `/notifications/list-comment/${post[i].post_id}/${user.userId}`
					}).done(function (post1) {
						count = comments.length - post1.length;
					})
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
					  </td>`;
				if(post[i].status == "未確認" || post[i].status == "修了"){
					content +=
						`<td>
								<i class="fas fa-check"></i>
							  </td>
							</tr>
						`;
				} else {
					content +=
						`<td>
								<button type="button" class="btn" onclick=changeStatus(${post[i].post_id})><i class='fas fa-check icon'></i></button>
							 </td>
							</tr>
						`;
				}
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
					  </td>`;
				if(post[i].status == "未確認" || post[i].status == "修了"){
					content +=
						`<td>
								<i class="fas fa-check"></i>
							  </td>
							</tr>
						`;
				} else {
					content +=
						`<td>
								<button type="button" class="btn" onclick=changeStatus(${post[i].post_id})><i class='fas fa-check icon'></i></button>
							 </td>
							</tr>
						`;
				}
			}
		}
		$("#postList tbody").html(content);
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
}

// Change the state of an event
function changeStatus(id){
	$.ajax({
	    type: "DELETE",
	    url: `/posts/change-status/${id}`
    }).done(function(resp){
		$.ajax({
	        type: "GET",
	        url: `/posts/student-post/${id}`,
	    }).done(function (post){
			App.showChangeConfirmDialog().then((result) => {
                if (result.isConfirmed){
                    $('#row'+id+ ' td').remove();
					$('#row'+id).html(`
						<input hidden id="post_id" value="${post.post_id}">
		                <td>${post.class_name}</td>
		                <td class="text-left"><i class="${post.event_icon} icon"></i>  ${post.event_name}</td>
						<td><p class='btn ${post.status === "未確認" ? 'btn-primary' : (post.status === "確認中" ? 'btn-warning' : 'btn-success')}'>
							${post.status}</p>
						</td>
						<td>
						    <a href="/posts/post-detail"  class="notification" style="text-decoration: none" onclick=postDetail(${post.post_id})><i class="fas fa-bell"></i></a>
					    </td>
						<td>
							<i class="fas fa-check"></i>
						</td>
					`);
                }
            });
	    })
	})
}

// save data on local storage
function postDetail(id){
	localStorage.setItem("postId",id);

	// Change status when doctor click on notification
	$.ajax({
		type: "PUT",
		url: `/posts/comment-exist/${id}`
	})
}

// Search by class, event, status
function searchDetail(){
	let id = localStorage.getItem("studentId");
	let class_name = $("#classes option:selected").text();
	let event_name = $("#events option:selected").text();
	let status_arr = [];
    let checkboxes = document.querySelectorAll('.status:checked');
    checkboxes.forEach((checkbox) => {
        status_arr.push(checkbox.value);
    });
	$.ajax({
    type: "GET",
    url: `/posts/student-detail/${id}`
    }).done(function (post){
        let content = "";
        for (let i = 0; i <= post.length - 1; i++) {
			if((class_name !="学年" && !post[i].class_name.includes(class_name)) || (event_name != "イベント" && !post[i].event_name.includes(event_name)) || (status_arr != "" && !status_arr.includes(post[i].status))){
			} else {
				let count = 0;
				$.ajax({
					type:"GET",
					async: false,
					url: "/user/getUser"
				}).done(function (user){
					$.ajax({
						type:"GET",
						async: false,
						url: `/comment/post/${post[i].post_id}`
					}).done(function (comments){
						$.ajax({
						    type: "GET",
							async: false,
						    url: `/notifications/list-comment/${post[i].post_id}/${user.userId}`
					    }).done(function(post1){
							count = comments.length - post1.length;
						})
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
					  </td>`;
					if(post[i].status == "未確認" || post[i].status == "修了"){
						content +=
							`<td>
								<i class="fas fa-check"></i>
							  </td>
							</tr>
						`;
					} else {
						content +=
							`<td>
								<button type="button" class="btn" onclick=changeStatus(${post[i].post_id})><i class='fas fa-check icon'></i></button>
							 </td>
							</tr>
						`;
					}
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
					  </td>`;
					if(post[i].status == "未確認" || post[i].status == "修了"){
						content +=
							`<td>
								<i class="fas fa-check"></i>
							  </td>
							</tr>
						`;
					} else {
						content +=
							`<td>
								<button type="button" class="btn" onclick=changeStatus(${post[i].post_id})><i class='fas fa-check icon'></i></button>
							 </td>
							</tr>
						`;
					}
				}
			}
        }

		$("#postList tbody").html(content);

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

$(".searchIcon").on("click",function(){
	$("#postList").DataTable().clear().destroy();
	searchDetail();
});

getAllClass();
getAllEvent();
getAllListEvent();
getStudentDetail();

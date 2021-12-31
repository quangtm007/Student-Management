App.getUser();

$(".back_out").on("click",function(){
	window.location.href = "/parent"
	localStorage.removeItem("studentId");
})

$(".page_student").on("click",function(){
	window.location.href="/posts/student-detail-parent"
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
	let id = localStorage.getItem("studentId");
	$.ajax({
		type: "GET",
		url: `/posts/student-detail/${id}`
	}).done(function (post){
		let content = "";
		for(let i = 0; i < post.length ; i++){
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
			content += contentTable(count, post[i]);
		}
		$("#postList tbody").html(content);
		$.fn.dataTable.ext.errMode = 'none';
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

// save data on local storage
function postDetail(id){
	localStorage.setItem("postId",id);
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
				content += contentTable(count, post[i]);
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

function contentTable(count,item){
	if(count === 0){
		return `
			<tr id="row${item.post_id}" class="text-center">
			  <input hidden id="post_id" value="${item.post_id}">
			  <td>${item.class_name}</td>
			  <td class="text-left"><i class="${item.event_icon} icon"></i>  ${item.event_name}</td>
			  <td><p class='btn ${item.status === "未確認" ? 'btn-primary' : (item.status === "確認中" ? 'btn-warning' : 'btn-success')}'>
				${item.status}</p>
			  </td>
			  <td>
				<a href="/posts/post-detail" class="notification" style="text-decoration: none" onclick=postDetail(${item.post_id})><i class="fas fa-bell"></i></a>
			  </td>
		`;
	} else {
		return `
			<tr id="row${item.post_id}" class="text-center">
			  <input hidden id="post_id" value="${item.post_id}">
			  <td>${item.class_name}</td>
			  <td class="text-left"><i class="${item.event_icon} icon"></i>  ${item.event_name}</td>
			  <td><p class='btn ${item.status === "未確認" ? 'btn-primary' : (item.status === "確認中" ? 'btn-warning' : 'btn-success')}'>
				${item.status}</p>
			  </td>
			  <td>
				<a href="/posts/post-detail" class="notification" style="text-decoration: none" onclick=postDetail(${item.post_id})><i class="fas fa-bell"></i></i><span class="badge">${count}</span></a>
			  </td>
		`;
	}
}

$(".searchIcon").on("click",function(){
	$("#postList").DataTable().clear().destroy();
	searchDetail();
});

getAllClass();
getAllEvent();
getAllListEvent();
getStudentDetail();

App.getUser();

$(".back_out").on("click",function(){
	window.location.href = "/login"
})

// get value list classes
function getAllClass(){
	$.ajax({
		type: "GET",
		url: "/class/list-class"
	}).done(function(classes) {
		let content = "";
		content += `<option value="">学年</option>`;
		for (let i = 0; i < classes.length; i++) {
			content += `
                    <option value="${classes[i].class_id}">${classes[i].class_name}</option>
                `;
		}
		$("#listClass").html(content);
	})
}

// get value list events
function getAllEvent(){
	$.ajax({
		type: "GET",
		url: "/event/list-event"
	}).done(function(events) {
		let content = "";
		content += `<option value="">イベント</option>`;
		for (let i = 0; i < events.length; i++) {
			content += `
				<option value="${events[i].event_id}">${events[i].event_name}</option>
			`;
		}
		$("#listEvent").html(content);
	})
}

//get value list student
function getAllPost(){
	$.ajax({
        type: "GET",
        url: "/posts/list-post"
    }).done(function (posts){
        let content = "";
        for (let i = 0; i <= posts.length-1 ; i++) {
			content += contentTable(posts[i]);
        }
        $("#postList tbody").html(content);
		if (posts.length === 0){
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
function student(id){
	localStorage.setItem("studentId",id);
	$(".changePage").dblclick(function () {
		window.location.replace("/posts/student-detail");
	});
}

// Search by name, class, event and hashtag
function searchStudent(){
	let student_name = $("#student_name").val()
	let class_name = $("#listClass option:selected").text();
	let event_name = $("#listEvent option:selected").text();
	let factorial_hashtag = $("#combo1-selected").text();
	let arr_factorial = [];
	arr_factorial = factorial_hashtag.split(" ");
	arr_factorial.pop()
	
	$.ajax({
        type: "GET",
        url: "/posts/list-post"
    }).done(function (posts){
        let content = "";
        for (let i = 0; i <= posts.length-1; i++) {
			if(posts[i].fullName.includes(student_name)){
				if(class_name === posts[i].class_name){
					if (posts[i].event_name != null){
						let a = posts[i].event_name;
						let b = [];
						b = a.split(",");
						for (let j = 0; j < b.length; j++){
							if(event_name === b[j]){
								if (factorial_hashtag != ""){
									if (posts[i].factorial_hashtag != null){
										let c = posts[i].factorial_hashtag
										let d = [];
										d = c.split(",");
										if (arr_factorial.every(elem => d.includes(elem))){
											content += contentTable(posts[i]);
										}
									} 
								} else {
									content += contentTable(posts[i]);
								} 
							}	
						}
					}
					if (event_name==="イベント"){
						if (factorial_hashtag != ""){
							if (posts[i].factorial_hashtag != null){
								let c = posts[i].factorial_hashtag
								let d = [];
								d = c.split(",");								
								if (arr_factorial.every(elem => d.includes(elem))){
									content += contentTable(posts[i]);
								}
							} 
						} else {
							content += contentTable(posts[i]);
						}
					}
				} else if (class_name === "学年") {
					if (event_name === "イベント") {
						if (factorial_hashtag != ""){
							if (posts[i].factorial_hashtag != null){
								let c = posts[i].factorial_hashtag;
								let d = [];
								d = c.split(",");
								if (arr_factorial.every(elem => d.includes(elem))){
									content += contentTable(posts[i]);
								}
							} 
						} else {
							content += contentTable(posts[i]);
						}
					} else if (posts[i].event_name != null && event_name != "イベント"){
						let a = posts[i].event_name;
						let b = [];
						b = a.split(",");
						for (let j = 0; j < b.length; j++){
							if(event_name === b[j]){
								if (factorial_hashtag != ""){
									if (posts[i].factorial_hashtag != null){
										let c = posts[i].factorial_hashtag
										let d = [];
										d = c.split(",");
										if (arr_factorial.every(elem => d.includes(elem))){
											content += contentTable(posts[i]);
										}
									} 
								} else {
									content += contentTable(posts[i]);
								}  
							}
						}
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

function contentTable(item){
	return `
		<tr id="row${item.id}" class="text-center changePage" onclick=student(${item.id})>
			<input class hidden id="${item.id}">
			<td>${item.user_code}</td>
			<td>${item.fullName}</td>
			<td>${item.class_name}</td>
			<td class="text-left event_name">
				<b>${item.event_name == null ? "" : item.event_name}<b>
			</td>
			<td class="text-left factorial_color">
				${item.factorial_color == null ? "" : item.factorial_color}
			</td>
			<td class="text-center"><a href="/chart" class="chart" style="text-decoration: none"><i class="fas fa-chart-area"></i></a></td>
		</tr>
	`;
}

$(".searchIcon").on("click",function(){
	$("#postList").DataTable().clear().destroy();
	searchStudent();
})

getAllClass();
getAllEvent()
getAllPost();

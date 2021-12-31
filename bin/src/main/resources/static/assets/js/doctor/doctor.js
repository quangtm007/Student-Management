App.getUser();
function getAllClass() {
	$.ajax({
		type: "GET",
		url: "/class/listClass"
	}).done(function(classes) {
		let content = "";
		for (let i = 0; i < classes.length; i++) {
			content += `
                    <option value="${classes[i].class_id}">${classes[i].class_name}</option>
                `;
		}
		$("#listClass").html(content);
	})
}

function getAllEvent() {
	$.ajax({
		type: "GET",
		url: "/event/listEvent"
	}).done(function(events) {
		let content = "";
		for (let i = 0; i < events.length; i++) {
			content += `
                    <option value="${events[i].event_id}">${events[i].event_name}</option>
                `;
		}
		$("#listEvent").html(content);
	})
}

function getAllPost(){
	$.ajax({
        type: "GET",
        url: "/post/list-post"
    }).done(function (posts){
        let content = "";
        for (let i = 0; i <= posts.length-1; i++) {
            content += `
                <tr id="row${posts[i].id}">
                  	<input hidden id="${posts[i].id}">
					<td>ST${posts[i].id}</td>
                    <td>${posts[i].fullName}</td>
                    <td>${posts[i].class_name}</td>
                    <td>${posts[i].event_name}</td>
                    <td>${posts[i].factorial_hashtag}</td>
                    <td class="text-center chart"><i class="fas fa-chart-area"></i></td>
                </tr>
	        `;
        }
        $("#postList tbody").html(content);
		$("#postList").DataTable({
		    "searching":   false,
		    "language": {
                "url": "//cdn.datatables.net/plug-ins/1.11.3/i18n/ja.json"
            }
		})
   })
}

getAllClass();
getAllEvent();
getAllPost();

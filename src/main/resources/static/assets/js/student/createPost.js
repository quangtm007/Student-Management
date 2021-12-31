App.getUser();

function getAllEvent() {
	$.ajax({
		type: "GET",
		url: "/event/list-event"
	}).done(function(events) {
		let content = "";
		for (let i = 0; i < events.length; i++) {
			content += `
				<option value="${events[i].event_id}">${events[i].event_name}</option>
			`;
		}
		$("#event").html(content);
	})
}

getAllEvent();

function createPost() {
	let work_completed = $("#work_completed").val();
	let action = $("#action").val();
	let power = $("#power").val();
	let capacity = $("#capacity").val();
	let think = $("#think").val();
	let event_id = $('#event :selected').val();
	
	let newEvent = {
		event_id: event_id
	}
	$.ajax({
		type:"GET",
		url: "/user/getUser"
	}).done(function (user){
		let id = user.userId;

		let newUser = {
			id: id
		}
		let post = {
			"work_completed": work_completed,
			"action": action,
			"power":  power,
			"capacity": capacity,
			"think": think,
			"event": newEvent,
			"user": newUser
		}

		$.ajax({
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			type: "POST",
			data: JSON.stringify(post),
			url: "/posts/insert-post"
		}).done((resp) =>{
			$.ajax({
				type:"GET",
				url: `/user/${id}`
				}).done(function(user1){
					console.log(resp)
					 let newUserClassPost = {
						user_id: id,
						class_id: user1.aclass.class_id,
						post_id: resp.post_id
					}

					$.ajax({
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						type: "POST",
						data: JSON.stringify(newUserClassPost),
						url: "/user-class-post/insert"
					})

					$("#create-form")[0].reset();
					App.showSuccessAlert("追加成功");
				}).fail(() =>{
					App.showErrorAlert("エラー!");
				})
			})
		})
	}

$("#create-button").on("click", () => {
	$("#create-form").submit();
})  

$(() => {
	$("#create-form").validate({
        onkeyup: function(element) {$(element).valid()},
        onclick: false,
        rules: {
        	work_completed: {
                required: true,
            },
            action: {
                required: true,
            },
            power: {
                required: true,
            },
            capacity: {
                required: true,
            },
            think: {
                required: true,
            }
        },
        messages: {
        	work_completed: {
                required: "正しく入力してください",
            },
            action: {
                required: "正しく入力してください",
            },
            power: {
                required: "正しく入力してください",
            },
            capacity: {
                required: "正しく入力してください",
            },
            think: {
                required: "正しく入力してください",
            },
         
        },
        submitHandler: function() {
        	createPost();
                    	
        }
        
    });
	
	
}) 
   
  
$(".back_out_btn").on("click", function() {
	window.location.href = "/student"
})

 $(".cancel").on("click", function() {
	$("#create-form")[0].reset();
})


	
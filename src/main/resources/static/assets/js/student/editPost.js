App.getUser();

$(".back_out").on("click", function() {
    window.location.href = "/student"
})

function editPost(){
    let work_completed = $("#work_completed").val();
    let action = $("#action").val();
    let power = $("#power").val();
    let capacity = $("#capacity").val();
    let think = $("#think").val();
    let eventId = $('#event_id :selected').val();

    let postId = $("#post_id").val();

    let postParam = {
        "id": postId,
        "workCompleted": work_completed,
        "action": action,
        "power":  power,
        "capacity": capacity,
        "think": think,
        "eventId": eventId
    }
    $.ajax({
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "/posts/edit",
        data: JSON.stringify(postParam),
    }).done((resp) => {
        App.showSuccessAlert("編集完了");
    }).fail(()=> {
        App.showErrorAlert("エラー");
    });
}

$(() => {
    $("#edit-form").validate({
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
            editPost();
        }
    });
})

$("#edit-button").on("click", () => {
    $("#edit-form").submit();
})
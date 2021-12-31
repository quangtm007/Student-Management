//Get list hashtag
function getListHashtag(){
    let factotials = [];
    $.ajax({
        type:"GET",
        async:false,
        url: "/factorials/list-factorial"
    }).done(function(factorial){
        for(let i = 0; i < factorial.length; i++){
            factotials.push(factorial[i].factorial_hashtag);
        }
    })
    return factotials;
}
getListHashtag();

$(document).ready(function() {
    let listHashTag = getListHashtag();

    // Kiem tra neu nhan nut # thi hien thi menu
    $("#input").keypress(function(event) {
        if (event.which === 35) {
            $('#hashtagDisplay').removeClass("d-none");
            let html = "";
            for (let hashTag of listHashTag) {
                html += "<li id='hashtagItem' class='list-group-item'>" + hashTag + "</li>";
            }
            $("#hashtagList").html(html);
        }
    });

    // Lay value cua item de gan vao input
    $("ul#hashtagList").delegate("li", "click", function() {
        console.log($(this).text())

        let currentVal = $('#input').text();
        console.log(currentVal)
        let itemSelectedVal = $(this).text().slice(1);

        $("#input").text(currentVal.trim() + itemSelectedVal.trim());
        $("#input").blur();
        $('#hashtagDisplay').addClass("d-none");
    });

    // Tat autocomplete neu nhu click ben ngoai
    $(document).click(function(event) {
        var $target = $(event.target);
        if ($target.closest('#hashtagDisplay').length == 0 && $target.closest('#input').length == 0) {
            $('#hashtagDisplay').addClass("d-none");
            $("#hashtagList").html('');
        }
    });
});
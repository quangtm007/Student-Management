App.getUser();

// handle back button for each role
function roleUser(){
    $.ajax({
        type:"GET",
        url: "/user/getUser"
    }).done(function (user){
        if(user.authorities[0] === "カウンセラー"){
            $(".back_out").on("click",function(){
                window.location.href = "/doctor"
                localStorage.removeItem("studentId");
            })
        }

        if(user.authorities[0] === "家族"){
            $(".back_out").on("click",function(){
                window.location.href = "/parent"
                localStorage.removeItem("studentId");
            })
        }
        if(user.authorities[0] === "先生"){
            $(".back_out").on("click",function(){
                window.location.href = "teacher"
                localStorage.removeItem("studentId");
            })
        }
    })
}

roleUser();

// get the detailed value of a student
function getStudentDetail(){
    let id = localStorage.getItem("studentId");
    $.ajax({
        type: "GET",
        url: `/user/${id}`
    }).done(function (users){
        let content = "";
        content += `
            <div>
                <h5 class="card-title1">学生コード : ${users.user_code}</h5>
                <h5 class="card-title">学生の名前 : ${users.fullName}</h5>
                <h5 class="card-title">グレード: ${users.aclass.class_name}</h5>
            </div>
            <div >
                <img style="width: 150px; height: 150px;" src="/assets/images/${users.avatar}" alt="picture" class="rounded-circle image">
            </div>
    `;
        $("#student-detail").html(content);
    })
}

//count occurrences of a student's hashtag
function getCountFactorial(){
    let factotials = [];
    let id = localStorage.getItem("studentId");
    for (let i = 1; i < 13; i++) {
        $.ajax({
            type:"GET",
            async:false,
            url: `/postDetail/count-factorial/${i}/${id}`
        }).done(function(count){
            factotials.push(count);
        })
    }
    return factotials;
}

// count the total number of occurrences of a student's hashtag
function getTotalFactorial(){
    let id = localStorage.getItem("studentId");
    let total = 0;
    $.ajax({
        type:"GET",
        async:false,
        url: `/postDetail/total-factorial/${id}`
    }).done(function(count){
        total = count;
    })
    return total;
}

//get a list of hashtags
function getAllHashtag(){
    let factotials = [];
    $.ajax({
        type:"GET",
        async:false,
        url: "/factorials/list-factorial"
    }).done(function(factorial){
        for(let i = 0; i < factorial.length; i++){
            factotials.push(factorial[i].factorial_name);
        }
    })
    return factotials;
}

//get a list of class
function getAllClass(){
    let arrClass = [];
    $.ajax({
        type:"GET",
        async:false,
        url: "/class/list-class"
    }).done(function(classes){
        for(let i = 0; i < classes.length; i++){
            arrClass.push(classes[i].class_name);
        }
    })
    return arrClass;
}

//get a list of class id
function getAllClassId(){
    let arrClassID = [];
    $.ajax({
        type:"GET",
        async:false,
        url: "/class/list-class"
    }).done(function(classes){
        for(let i = 0; i < classes.length; i++){
            arrClassID.push(classes[i].class_id);
        }
    })
    return arrClassID;
}

//get the number of occurrences of a hashtag according to the condition that it is from class 小1 to 四年生
function getFactorialByClass(){
    let arrFactorial = [];
    let id = localStorage.getItem("studentId");
    let content = "";
    let color = ["#000000", "#0000FF", "#8B4513", "#00FFFF", "#808080", "#008000", "#FF00FF", "#FFA500", "#FF1493", "#800080", "#FF0000", "#FFFF00"]
    let hashtag = getAllHashtag();
    let arr = [];
    $.ajax({
        type:"GET",
        async:false,
        url: "/factorials/list-factorial"
    }).done(function(factorial){
        $.ajax({
            type: "GET",
            async:false,
            url: "/class/list-class"
        }).done(function(classes) {
            for (let i = 0; i < factorial.length; i++) {
                for (let j = 0; j < classes.length; j++) {
                    $.ajax({
                        type: "GET",
                        async: false,
                        url: `/postDetail/count-factorial-class/${factorial[i].factorial_id}/${id}/${classes[j].class_id}`
                    }).done(function (count) {
                        arrFactorial.push(count);
                    })
                }
                content += `
                    <tr>
                        <td style="background: ${color[i]};" scope="row"><span style="color:white"><b>${hashtag[i]}</b></span></td>
                        <td>${arrFactorial[0] === 0 ? '-' : arrFactorial[0]}</td>
                        <td>${arrFactorial[1] === 0 ? '-' : arrFactorial[1]}</td>
                        <td>${arrFactorial[2] === 0 ? '-' : arrFactorial[2]}</td>
                        <td>${arrFactorial[3] === 0 ? '-' : arrFactorial[3]}</td>
                        <td>${arrFactorial[4] === 0 ? '-' : arrFactorial[4]}</td>
                        <td>${arrFactorial[5] === 0 ? '-' : arrFactorial[5]}</td>
                        <td>${arrFactorial[6] === 0 ? '-' : arrFactorial[6]}</td>
                        <td>${arrFactorial[7] === 0 ? '-' : arrFactorial[7]}</td>
                        <td>${arrFactorial[8] === 0 ? '-' : arrFactorial[8]}</td>
                        <td>${arrFactorial[9] === 0 ? '-' : arrFactorial[9]}</td>
                        <td>${arrFactorial[10] === 0 ? '-' : arrFactorial[10]}</td>
                        <td>${arrFactorial[11] === 0 ? '-' : arrFactorial[11]}</td>
                        <td>${arrFactorial[12] === 0 ? '-' : arrFactorial[12]}</td>
                        <td>${arrFactorial[13] === 0 ? '-' : arrFactorial[13]}</td>
                        <td>${arrFactorial[14] === 0 ? '-' : arrFactorial[14]}</td>
                        <td>${arrFactorial[15] === 0 ? '-' : arrFactorial[15]}</td>
                    </tr>
                `;

                arrFactorial = [];
            }
            $("#listTable tbody").html(content);
        })
    })
}

// get a list of occurrences of a hashtag conditional on being from class 小1 to 四年生
function getDataFactorial(){
    let arrFactorial = [];
    let id = localStorage.getItem("studentId");
    let arr = [];
    $.ajax({
        type:"GET",
        async:false,
        url: "/factorials/list-factorial"
    }).done(function(factorial){
        $.ajax({
            type: "GET",
            async:false,
            url: "/class/list-class"
        }).done(function(classes) {
            for (let i = 0; i < factorial.length; i++) {
                for (let j = 0; j < classes.length; j++) {
                    $.ajax({
                        type: "GET",
                        async: false,
                        url: `/postDetail/count-factorial-class/${factorial[i].factorial_id}/${id}/${classes[j].class_id}`
                    }).done(function (count) {
                        arrFactorial.push(count);
                    })
                }
                arr.push(arrFactorial);
                arrFactorial = [];
            }
        })
    })
    return arr;
}

getStudentDetail();
getCountFactorial();
getTotalFactorial();
getAllHashtag()
getFactorialByClass();

var xValues = getAllHashtag();
var yValues = getCountFactorial();
var barColors = [
    "#000000",
    "#0000FF",
    "#8B4513",
    "#00FFFF",
    "#808080",
    "#008000",
    "#FF00FF",
    "#FFA500",
    "#FF1493",
    "#800080",
    "#FF0000",
    "#FFFF00"
];
const doughnutLabels = {
    id: 'doughnutLabels',
    afterDraw(chart, args, options) {
        const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(getTotalFactorial(), width / 2, top + (height /1.85));
    }
}
let circleChart = new Chart("myChart2", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            text: "World Wide Wine Production 2018"
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels:{
                font:{size:20,weight:'bold'},
                color:'#FFFFFF',
                formatter: function(value, index, values) {
                    if(value >0 ){
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }else{
                        value = "";
                        return value;
                    }
                }
            }
        }
    },
    plugins: [ChartDataLabels,doughnutLabels]
});

// setup
const data = {
    labels: getAllClass(),
    datasets: [{
        label: getAllHashtag()[0],
        data: getDataFactorial()[0],
        backgroundColor: 'black',
        borderColor: 'rgba(255, 26, 104, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[1],
        data: getDataFactorial()[1],
        backgroundColor: 'blue',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[2],
        data: getDataFactorial()[2],
        backgroundColor: 'brown',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[3],
        data: getDataFactorial()[3],
        backgroundColor: 'cyan',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[4],
        data: getDataFactorial()[4],
        backgroundColor: 'gray',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[5],
        data: getDataFactorial()[5],
        backgroundColor: 'green',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[6],
        data: getDataFactorial()[6],
        backgroundColor: 'magenta',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[7],
        data: getDataFactorial()[7],
        backgroundColor: 'orange',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[8],
        data: getDataFactorial()[8],
        backgroundColor: 'pink',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[9],
        data: getDataFactorial()[9],
        backgroundColor: 'purple',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[10],
        data: getDataFactorial()[10],
        backgroundColor: 'red',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: getAllHashtag()[11],
        data: getDataFactorial()[11],
        backgroundColor: 'yellow',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
    }]
};

// config
const config = {
    type: 'bar',
    data,
    options: {
        borderWidth: 1,
        scales: {
            x: {
                stacked: true,
                title: {
                    font:{size:20,weight:'bold'},
                    display: true,
                    text: '(クラス)'
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: {
                    font:{size:20,weight:'bold'},
                    display: true,
                    text: '(学生の人基礎力)'
                }
            }
        },
        plugins: {
            tooltip: {
                enabled: true
            },
            legend: {
                display: false
            },
            datalabels:{
                color:'#FFFFFF',
                formatter: function(value, index, values) {
                    if(value >0 ){
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }else{
                        value = "";
                        return value;
                    }
                }
            }
        }
    },
    plugins: [ChartDataLabels]
};

// render init block
const myChart = new Chart(
    document.getElementById('myChart3'),
    config
);

//Handling when clicking on a cell in the chart column
function chartColumnModal(click) {
    let id = localStorage.getItem("studentId")
    const clickedPie = myChart.getElementsAtEventForMode(click, "nearest", {intersect: true}, true);
    if(clickedPie.length) {
        const pieSlice = clickedPie[0];
        let classes = getAllClassId()[pieSlice.index];

        let factorial_name = pieSlice.element.$datalabels[0].$context.dataset.label;

        $.ajax({
            type: "GET",
            async:false,
            url: `/postDetail/list-factorial/${classes}/${factorial_name}/${id}`
        }).done(function(custom){
            console.log(custom)
            let content = "";
            for (let i = 0; i < custom.length; i++) {
                content += `
                    <tr class="changePage" onclick=postDetail(${custom[i].post_id})>
                        <td class="text-center">${custom[i].post_id}</td>
                        <td class="text-center">${custom[i].event_name}</td>
                    </tr>
                `
            }
            $("#list_event tbody").html(content);
            $("#showModalEvent").modal('show');
        })
    }
}

//Handling when clicking on a cell in the chart circle
function chartCircleModal(click){
    let id = localStorage.getItem("studentId")
    const clickedPie = circleChart.getElementsAtEventForMode(click, "nearest", {intersect: true}, true);
    if(clickedPie.length) {
        const pieSlice = clickedPie[0];

        let factorial_name = getAllHashtag()[pieSlice.index];

        $.ajax({
            type: "GET",
            async:false,
            url: `/postDetail/list-event/${factorial_name}/${id}`
        }).done(function(custom){
            let content = "";
            for (let i = 0; i < custom.length; i++) {
                content += `
                    <tr class="changePage" onclick=postDetail(${custom[i].post_id})>
                        <td class="text-center">${custom[i].post_id}</td>
                        <td class="text-center">${custom[i].event_name}</td>
                    </tr>
                `
            }
            $("#list_event tbody").html(content);
            $("#showModalEvent").modal('show');
        })
    }
}

function postDetail(id){
    localStorage.setItem("postId",id);
    $(".changePage").dblclick(function () {
        window.location.replace("/posts/post-detail");
    });
}

$("#flexSwitchCheckDefault").on("click",function(){
    let checkBoxes = $("input[type='checkbox']");
    if(checkBoxes.prop("checked")== true){
        $("#chart-column").addClass("hidden");
        $("#chart-table").removeClass("hidden");
    } else {
        $("#chart-column").removeClass("hidden");
        $("#chart-table").addClass("hidden");
    }
})

$("#myChart2").on("click",function (click) {
    chartCircleModal(click);
});

$("#myChart3").on("click",function (click) {
    chartColumnModal(click);
});

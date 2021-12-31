class App {
    static showCreateConfirmDialog(){
        return Swal.fire({
            title: 'Bạn có chắc chắn không?',
            text: "Bạn sẽ không thể hoàn lại!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chắc chắn',
            cancelButtonText: 'Không',
        })
    }

    static showDeleteConfirmDialog() {
        return Swal.fire({
            icon: 'warning',
            text: 'Bạn có muốn xóa dữ liệu đã chọn không ?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, tôi muốn xóa!',
            cancelButtonText: 'Không',
        })
    }

    static showRestoreConfirmDialog() {
        return Swal.fire({
            icon: 'warning',
            text: 'Bạn có muốn khôi phục dữ liệu đã chọn không ?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, tôi muốn khôi phục!',
            cancelButtonText: 'Không',
        })
    }

	static showHideConfirmDialog() {
        return Swal.fire({
            icon: 'warning',
            text: 'Bạn có muốn ẩn dữ liệu đã chọn không ?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, tôi muốn ẩn!',
            cancelButtonText: 'Không',
        })
    }

    static showSuccessAlert(t) {
        Swal.fire({
            icon: 'success',
            title: t,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        })
    }

    static showErrorAlert(t) {
        Swal.fire({
            icon: 'error',
            title: 'Cảnh báo',
            text: t,
        })
    }

    static getUser(){
        $.ajax({
            type:"GET",
            url: "/user/getUser"
        }).done(function (user){
				$("#user").html(`こにちわ ${user.username}
	                            </br>
	                             ${user.authorities[0]}`);
	            $("#username-hidden").val(user.username);
			$.ajax({
            type:"GET",
            url: `/user/${user.userId}`
			}).done(function(user1){
				$(".nav_header_img").html(`<img src="assets/images/${user1.avatar}" alt="picture" class="rounded-circle">`)
				}
			) 
        })
    }

    static getTime(){
        let time = new Date();
        let hh = time.getHours();
        let mm = time.getMinutes();
        let ss = time.getSeconds();
        return `${hh}:${mm}:${ss}`;
    }

    static getToday(){
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            return `${yyyy}-${mm}-${dd}`;
    }

    static getCurrentMonthAndYear(){
        let today = new Date();
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        return `${yyyy}-${mm}`;
    }

    static addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return `${result.getFullYear()}-${String(result.getMonth() + 1).padStart(2, '0')}-${String(result.getDate()).padStart(2, '0')}`;
    }

    static addTimes (startTime, endTime) {
        let times = [ 0, 0, 0 ]
        let max = times.length

        let a = (startTime || '').split(':')
        let b = (endTime || '').split(':')

        // normalize time values
        for (let i = 0; i < max; i++) {
            a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
            b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
        }

        // store time values
        for (let i = 0; i < max; i++) {
            times[i] = a[i] + b[i]
        }

        let hours = times[0]
        let minutes = times[1]
        let seconds = times[2]

        if (seconds >= 60) {
            let m = (seconds / 60) << 0
            minutes += m
            seconds -= 60 * m
        }

        if (minutes >= 60) {
            let h = (minutes / 60) << 0
            hours += h
            minutes -= 60 * h
        }

        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
    }

    static getCurrentMonth(){
            let today = new Date();
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            return `${mm}`;
    }

    static logout(){
		document.cookie = "cookiename= ; Expires = Thu, 01 Jan 1970 00:00:00 GMT"
        document.cookie = 'JWT' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = "http://localhost:8080/login";
    }

    static setCookie(cName, cValue) {
        const d = new Date();
        d.setTime(d.getTime() + (24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
    }
}

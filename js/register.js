function register() {
    const form = document.forms[0];

    form.addEventListener("submit", function(event) {

        event.preventDefault();
        var data = new FormData(form);
        var str = 'Регистрация прошла успешно';
        var doRedirect = true;
        var icon = "success";

       // alert('Регистрация прошла успешно');
        if ((data.get('password').length <= 5)) {
            str ='Пароль слишком короткий';
            icon = "error";
            doRedirect = false;
        }
        else if ((data.get('name').length < 3)) {
            str ='Имя слишком короткое';
            icon = "error";
            doRedirect = false;

        }
        else if ((data.get('username').length < 3)) {
            str ='Имя пользователя слишком короткое';
            icon = "error";
            doRedirect = false;
        }
        swal({
            title: str,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        })

        if (doRedirect) {
            setTimeout(function () {
                window.location.href = "index.html";
            }, 1800); //will call the function after 2 secs.
        }

    });

    form.addEventListener("formdata", event => {
        // event.formData grabs the object
        console.log(event.formData);
    });
}

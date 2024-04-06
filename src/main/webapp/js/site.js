document.addEventListener( 'DOMContentLoaded', () => {
    // шукаємо кнопку реєстрації, якщо знаходимо - додаємо обробник
    const signupButton = document.getElementById("signup-button");
    if(signupButton) { signupButton.onclick = signupButtonClick; }
    // шукаємо кнопку автентифікації, якщо знаходимо - додаємо обробник
    const authButton = document.getElementById("auth-button");
    if(authButton) { authButton.onclick = authButtonClick; }
    // налаштування модальних вікон
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {
        "opacity": 	    	0.5, 	// Opacity of the modal overlay.
        "inDuration": 		250, 	// Transition in duration in milliseconds.
        "outDuration": 		250, 	// Transition out duration in milliseconds.
        "onOpenStart": 		null,	// Callback function called before modal is opened.
        "onOpenEnd": 		null,	// Callback function called after modal is opened.
        "onCloseStart":		null,	// Callback function called before modal is closed.
        "onCloseEnd": 		null,	// Callback function called after modal is closed.
        "preventScrolling": true,	// Prevent page from scrolling while modal is open.
        "dismissible": 		true,	// Allow modal to be dismissed by keyboard or overlay click.
        "startingTop": 		'4%',	// Starting top offset
        "endingTop": 		'10%'	// Ending top offset
    });
    checkAuth();
});

function getContext() {
    return window.location.pathname.split('/')[1];
}

function authButtonClick(e) {
    const emailInput = document.querySelector('input[name="auth-email"]');
    if( ! emailInput ) { throw "'auth-email' not found" ; }
    const passwordInput = document.querySelector('input[name="auth-password"]');
    if( ! passwordInput ) { throw "'auth-password' not found" ; }

    // console.log( emailInput.value, passwordInput.value ) ;
    fetch(`/${getContext()}/auth?email=${emailInput.value}&password=${passwordInput.value}`, {
        method: 'GET'
    })
        .then( r => r.json() )
        .then( j => {
            if( j.data == null || typeof j.data.token == "undefined" ) {
                document.getElementById("modal-auth-message").innerText = "У вході відмовлено";
            }
            else {
                // авторизація токенами передбачає їх збереження з метою подальшого використання
                // Для того щоб токени були доступні після перезавантаження їх вміщують
                // до постійного сховища браузера - localStorage ...
                localStorage.setItem("auth-token", j.data.token);
                window.location.reload();
            }
        } ) ;
}

function checkAuth() {
    // ... при завантаженні сторінки перевіряємо наявність даних автентифікації у localStorage
    const authToken = localStorage.getItem("auth-token");
    if( authToken ) {
        // перевіряємо токен на валідність і одержуємо дані про користувача
        fetch(`/${getContext()}/auth?token=${authToken}`, {
            method: 'POST'
        })
            .then( r => r.json() )
            .then( j => {
                if(j.meta.status == 'success') {
                    // замінити "кнопку" входу на аватарку користувача
                    document.querySelector('[data-auth="avatar"]').innerHTML = `<img title="${j.data.name}" class="nav-avatar" src="/${getContext()}/img/avatar/${j.data.avatar}" />`
                    const product = document.querySelector('[data-auth="product"]');
                    if(product) {
                        fetch(`/${getContext()}/product.jsp`)
                            .then(r => r.text())
                            .then(t => {
                                product.innerHTML = t;
                                document.getElementById("add-product-button")
                                    .addEventListener('click', addProductClick);
                            });
                    }
                }
            } );
    }
}
function addProductClick(e) {
    // Збираємо дані з форми додавання продукту
    const form = e.target.closest('form');
    const name = form.querySelector("#product-name").value.trim();
    const price = Number(form.querySelector("#product-price").value);
    const description = form.querySelector("#product-description").value.trim();
    const fileInput = form.querySelector("#product-img");
    // Проводимо валідацію

    // Формуємо дані для передачі на сервер
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", fileInput.files[0]);
    formData.append("token", localStorage.getItem("auth-token"));
    // надсилаємо дані
    fetch(`/${getContext()}/shop-api`, {
        method: 'POST',
        body: formData
    })
        .then( r => r.json() )
        .then( console.log );
}

function signupButtonClick(e) {
    // шукаємо форму - батьківській елемент кнопки (e.target)
    const signupForm = e.target.closest('form') ;
    if( ! signupForm ) {
        throw "Signup form not found" ;
    }
    // всередині форми signupForm знаходимо елементи
    const nameInput = signupForm.querySelector('input[name="user-name"]');
    if( ! nameInput ) { throw "nameInput not found" ; }
    const emailInput = signupForm.querySelector('input[name="user-email"]');
    if( ! emailInput ) { throw "emailInput not found" ; }
    const passwordInput = signupForm.querySelector('input[name="user-password"]');
    if( ! passwordInput ) { throw "passwordInput not found" ; }
    const repeatInput = signupForm.querySelector('input[name="user-repeat"]');
    if( ! repeatInput ) { throw "repeatInput not found" ; }
    const avatarInput = signupForm.querySelector('input[name="user-avatar"]');
    if( ! avatarInput ) { throw "avatarInput not found" ; }

    /// Валідація даних
    let isFormValid = true ;

    if( nameInput.value == "" ) {
        nameInput.classList.remove("valid");
        nameInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        nameInput.classList.remove("invalid");
        nameInput.classList.add("valid");
    }

    if( ! isFormValid ) return ;
    /// кінець валідації

    // формуємо дані для передачі на бекенд
    const formData = new FormData() ;
    formData.append( "user-name", nameInput.value ) ;
    formData.append( "user-email", emailInput.value ) ;
    formData.append( "user-password", passwordInput.value ) ;
    if( avatarInput.files.length > 0 ) {
        formData.append( "user-avatar", avatarInput.files[0] ) ;
    }

    // передаємо - формуємо запит
    fetch( window.location.href, { method: 'POST', body: formData } )
        .then( r => r.json() )
        .then( j => {
            console.log(j);
            /*
            if( j.status == 1 ) {  // реєстрація успішна
                alert( 'реєстрація успішна' ) ;
                window.location = '/' ;  // переходимо на головну сторінку
            }
            else {  // помилка реєстрації (повідомлення - у полі message)
                alert( j.data.message ) ;
            }*/
        } ) ;
}
/*
Д.З. Удосконалити алгоритм видачі токенів:
якщо для даного користувача вже існує валідний токен, то
замість генерування нового слід повернути старий.
При поверненні подовжити дію токену на половину стандартного терміну.
 */
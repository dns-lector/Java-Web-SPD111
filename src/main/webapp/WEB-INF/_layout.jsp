<%@ page contentType="text/html;charset=UTF-8" %>
<%
    String pageBody = (String) request.getAttribute("page-body");
    if( pageBody == null ) {
        pageBody = "home" ;
    }
    String bodyFile = "/WEB-INF/" + pageBody + ".jsp" ;

    String context = request.getContextPath() ;
%>
<html>
<head>
    <title>Title</title>
    <!--Import Google Icon Font-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="<%=context%>/css/site.css" />
    <link rel="icon" href="<%=context%>/img/Java_Logo.png" />
</head>
<body>
<header>
    <nav>
        <div class="nav-wrapper lime">
            <a href="<%=context%>/" class="brand-logo left">Logo</a>
            <ul id="nav-mobile" class="right">
                <li><a href="<%=context%>/cart"><i class="material-icons prefix">shopping_cart</i></a></li>
                <li data-auth="avatar"><a href="#auth-modal" class="modal-trigger"><i class="material-icons">key</i></a></li><!-- Modal Trigger -->
                <li><a href="<%=context%>/signup"><i class="material-icons">person_add</i></a></li>
            </ul>
        </div>
    </nav>
</header>
<main class="container">
    <jsp:include page="<%= bodyFile %>"/>
</main>
<footer class="page-footer lime">
    <div class="container">
        <div class="row">
            <div class="col l6 s12">
                <h5 class="white-text">Footer Content</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
            </div>
            <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <div class="container">
            © 2024 Copyright Text
            <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
    </div>
</footer>

<!-- Modal Structure -->
<div id="auth-modal" class="modal">
    <div class="col s12">
        <div class="modal-content">
            <h4>Введіть e-mail та пароль для входу</h4>
            <div class="input-field col s6">
                <i class="material-icons prefix">email</i>
                <input id="user-input-email" type="text" class="validate" name="auth-email">
                <label for="user-input-email">Email</label>
            </div>
            <div class="input-field col s6">
                <i class="material-icons prefix">lock</i>
                <input id="user-input-password" type="password" class="validate" name="auth-password">
                <label for="user-input-password">Password</label>
            </div>
        </div>
        <div class="modal-footer">
            <span id="modal-auth-message"></span>
            <button class="modal-close btn-flat grey">Закрити</button>
            <button class="btn-flat lime" style="margin-left:15px" id="auth-button">Вхід</button>
        </div>
    </div>
</div>

<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="<%=context%>/js/site.js"></script>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/png" href="#"/>
    <title>@yield('title', 'Comite de Agua')</title>
    <!-- Stylesheets -->
    @include('template.global_css')
    @stack('css')
</head>
<body>
<div class='main-container'>
    <header>
    </header>
    <section class="wrapper">
        @include('components.navbar')
        @yield('content')
        @include('components.footer')
    </section>
</div>


<div class="modal fade"
     id="modal-update-price"
     tabindex="-1"
     role="dialog"
     aria-hidden="true">
    <div id="modal-update-price-size" class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary text-center d-flex p-3">
                <h5 class="modal-title align-self-center" id="modal-update-price-header"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" style="color: #ffffff;">&times;</span>
                </button>
            </div>
            <div class="modal-body">

            </div>
        </div>
    </div>
</div>

{{--<!-- Javascript -->--}}
@include('template.global_js')
@stack('scripts')
</body>
</html>

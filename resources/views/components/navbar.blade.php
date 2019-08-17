
<nav class="navbar navbar-expand-lg navbar-dark bg-primary ">
    @if(Auth::check())
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler"
                aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    @else
    @endif
    <h1 class="ml-auto" id="reloj"></h1>
</nav>

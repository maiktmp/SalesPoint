@php
    @endphp
@extends('template.main')
@section('title', 'Resumen')

@push('scripts')
    <script src="{{asset('js/order.js')}}"></script>
@endpush
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center">
                <div id="react-dom" class="text-center"></div>
            </div>
        </div>
    </div>
@endsection

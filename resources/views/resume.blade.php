@php
    @endphp
@extends('template.main')
@section('title', 'Resumen')

@push('scripts')
    <script src="{{asset('js/order.js?v=2')}}"></script>
@endpush
@section('wrapper-style')
    style="background-color: black"
    @endsection
@section('content')
    <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="col-12 text-center p-0">
                <div id="react-dom" class="text-center"></div>
            </div>
        </div>
    </div>
@endsection

@php
    @endphp
@extends('template.main')
@section('title', 'Resumen de ordenes')
@push('scripts')
    <script src="{{asset('js/orders_resume.js?v=2')}}"></script>
@endpush
@section('content')
    <div class="container-fluid p-0">
        <div id="react-dom" class="text-center"></div>
    </div>
@endsection

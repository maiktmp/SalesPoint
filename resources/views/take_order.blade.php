@php
    @endphp
@extends('template.main')
@section('title', 'Resumen')
@push('scripts')
    <script src="{{asset('js/take_order.js?v=2')}}"></script>
@endpush
@section('content')
    <div class="container-fluid">
        <div id="react-dom" class="text-center"></div>
    </div>
@endsection

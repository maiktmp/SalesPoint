@php
    /*
    *************************************************
            Properties to use the input component
                         @input()
    *************************************************
     @property string        label      => Set label name
     @property string        name       => Set name for input
     @property string|null   errorName  => Set key for errors, use the $name as the default value
     @property string|null   type       => Set type of input use "text" as the default value
     @property string|null   value      => Set value for input
     @property string|null   labelClass => Use set class label
     @property string|null   id         => Use set Id to input
     @property string|null   inputClass => Set class of input
     @property string[]|null properties => Array of properties example ['disabled' => true ]
     */
    $name=$name??'';
    $type=$type??'text';
    $properties=$properties??[];
    $errorName=$errorName??$name;
@endphp

@if($type ==='hidden')
    <input
        id="{{$id??""}}"
        type="hidden"
        class="{{$inputClass?? ""}}"
        value="{{$value??""}}"
        name="{{$name}}"
    @forelse($properties as $property=>$value)
        {{$property}}="{{$value}}"
    @empty

    @endforelse
    >
@else
    <div class="form-group">
        <label class="form-label {{$labelClass??null}}"
               for="{{$id ?? $name}}">{{$label}}</label>
        <input id="{{$id ?? $name}}"
               type="{{$type}}"
               class="form-control {{$inputClass??""}} {{ $errors->has($errorName) ? ' is-invalid' : '' }}"
               name="{{$name??""}}"
               value="{{ $value ?? null }}"
               style="min-height: 41px"
        @forelse($properties as $property=>$value)
            {{$property}}="{{$value}}"
        @empty

        @endforelse
        />
        <span class="invalid-feedback">{{ $errors->first($errorName) }}</span>
    </div>
@endif


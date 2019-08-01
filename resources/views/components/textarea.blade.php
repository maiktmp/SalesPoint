@php
    /*
    *************************************************
            Properties to use the select component
                         @textarea()
    *************************************************
     @property string        $label      => Set label name
     @property string        $name       => Set name for input
     @property integer|null  $rows       => Set number of rows, use 5 as the default value
     @property string|null   $value       => Set text within textarea
     @property string|null   $errorName  => Set key for errors, use the $name as the default value
     @property string|null   $labelClass => Use set class label
     @property string|null   $id         => Use set Id to input
     @property string|null   $inputClass => Set class of input
     @property string[]|null $properties => Array of properties example ['disabled' => true ]
     */
    $properties=$properties??[];
@endphp
<div class="form-group">
    <label class="{{$labelClass??null}}"
           for="{{$id??$name}}">{{$label}}</label>
    <textarea class="form-control {{$inputClass??""}}{{ $errors->has($errorName??$name) ? 'is-invalid' : '' }}"
              id="{{$id??$name}}"
              name="{{$name}}"
              rows="{{$rows??5}}"
    @forelse($properties as $property=>$value)
        {{$property}}="{{$value}}"
    @empty

    @endforelse
    style= "resize: none"
    >{{$value??null}}</textarea>
    <span class="invalid-feedback">{{ $errors->first($errorName??$name) }}</span>
</div>

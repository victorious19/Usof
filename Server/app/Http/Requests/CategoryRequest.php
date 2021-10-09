<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    public function authorize()
    {
        return backpack_auth()->check();
    }
    public function rules()
    {
        return [
            
        ];
    }
    public function attributes()
    {
        return [
            
        ];
    }
    public function messages()
    {
        return [
            
        ];
    }
}

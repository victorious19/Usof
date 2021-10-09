<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\PostRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class PostCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\Post::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/post');
        CRUD::setEntityNameStrings('post', 'posts');
    }

    protected function setupListOperation()
    {
        CRUD::column('author');
        CRUD::column('title');
        CRUD::column('content');
        CRUD::column('status');
        CRUD::column('categories');

    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(PostRequest::class);

        CRUD::field('author');
        CRUD::field('title');
        CRUD::field('content');
        CRUD::field('status');
        CRUD::field('categories');

    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CommentRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class CommentCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\Comment::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/comment');
        CRUD::setEntityNameStrings('comment', 'comments');
    }

    protected function setupListOperation()
    {
        CRUD::column('user_id');
        CRUD::column('post_id');
        CRUD::column('content');

    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(CommentRequest::class);

        CRUD::field('user_id');
        CRUD::field('post_id');
        CRUD::field('content');

    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}

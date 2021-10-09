<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\LikeRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class LikeCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\Like::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/like');
        CRUD::setEntityNameStrings('like', 'likes');
    }

    protected function setupListOperation()
    {
        CRUD::column('user_id');
        CRUD::column('post_id');
        CRUD::column('comment_id');
        CRUD::column('type');

    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(LikeRequest::class);

        CRUD::field('user_id');
        CRUD::field('post_id');
        CRUD::field('comment_id');
        CRUD::field('type');

    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}

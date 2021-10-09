<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\PostCategoryRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class PostCategoryCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\PostCategory::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/postcategory');
        CRUD::setEntityNameStrings('postcategory', 'post_categories');
    }

    protected function setupListOperation()
    {
        CRUD::column('post_id');
        CRUD::column('category_id');

    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(PostCategoryRequest::class);

        CRUD::field('post_id');
        CRUD::field('category_id');

    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}

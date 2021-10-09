<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use App\Http\Controllers\UsersController;

class UserCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation { store as traitStore; }
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\User::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/user');
        CRUD::setEntityNameStrings('user', 'users');
    }

    protected function setupListOperation()
    {
        CRUD::column('login');
        CRUD::column('full_name');
        CRUD::column('profile_picture');
        CRUD::column('email');
        CRUD::column('password');
        CRUD::column('rating');
        CRUD::column('role');

    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(UserRequest::class);

        CRUD::field('login');
        CRUD::field('full_name');
        //CRUD::field('profile_picture')->type('image');
        CRUD::field('email');
        CRUD::field('password');
        //CRUD::field('rating');
        CRUD::field('role')->type('enum');

    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}

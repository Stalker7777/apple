<?php

namespace console\controllers;

use yii\console\Controller;
use common\models\User;

class ConsoleController extends Controller
{
    /**
     * yii console/add-admin
     */
    public function actionAddAdmin()
    {
        $admin = User::find()->where(['username' => 'admin'])->one();
        
        if($admin === null) {
            $user = new User();
    
            $user->username = 'admin';
            $user->setPassword('123456');
            $user->generateAuthKey();
            $user->email = 'admin@mail.ru';
            $user->status = User::STATUS_ACTIVE;
    
            if($user->save()) {
                echo "User Admin inserted to DB" . "\n";
                return;
            }
            else {
                print_r($user->getErrors());
            }
        }
        
        echo "User Admin exists in DB" . "\n";
    }
}
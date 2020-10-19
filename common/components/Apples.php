<?php

namespace common\components;

use app\models\Apple;
use yii\helpers\Url;

class Apples
{
    public function generate()
    {
        Apple::deleteAll([]);
        
        $count = rand(10, 20);
        
        $messages = [];
        $is_error = false;
        
        for ($i = 1; $i < $count; $i++) {
    
            $apple = new Apple();
    
            $apple->color = rand(1, 3);
            $apple->size = 1;
            $apple->status = Apple::STATUS_ON_TREE;
    
            if(!$apple->save())
            {
                $is_error = true;
                foreach ($apple->getErrors () as $attribute => $error)
                {
                    foreach ($error as $message)
                    {
                        $messages[] = ($attribute.": ".$message);
                    }
                }
            }
        }
        
        return ['is_error' => $is_error, 'message' => implode('; ', $messages)];
    }
    
    public static function getPathImage($model = null)
    {
        if($model == null) return '';
        
        $base_url = Url::base() . '/images/';
        
        if($model['status'] == Apple::STATUS_ROTTEN) {
            return  $base_url . 'apple_rotten.jpg';
        }
        
        $name_image = '';
        
        switch ($model['color']) {
            case Apple::COLOR_GREEN:
                    $name_image = 'apple_green';
                break;
            case Apple::COLOR_RED:
                    $name_image = 'apple_red';
                break;
            case Apple::COLOR_YELLOW:
                    $name_image = 'apple_yellow';
                break;
        }
        
        if(empty($name_image)) return '';
        
        if($model['size'] < 1) {
            $name_image .= '_eat';
        }
        
        return $base_url . $name_image . '.jpg';
    }
}
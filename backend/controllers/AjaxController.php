<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use common\components\Apples;
use app\models\Apple;

/**
 * Ajax controller
 */
class AjaxController extends Controller
{
    public function actionGetApples()
    {
        $apple = Apple::find()->asArray()->all();
        
        foreach ($apple as &$item) {
            $item['image'] = Apples::getPathImage($item);
        }
        
        if(count($apple) > 0) {
            return json_encode(['error' => false, 'apples' => $apple, 'count' => count($apple)]);
        }
        
        return json_encode(['error' => true, 'message' => 'При получении яблок возникла ошибка!']);
    }
    
    public function actionGenerateApples()
    {
        $apples = new Apples();
        
        return json_encode($apples->generate());
    }
}

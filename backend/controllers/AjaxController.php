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
            return json_encode(['is_error' => false, 'apples' => $apple, 'count' => count($apple)]);
        }
        
        return json_encode(['is_error' => true, 'message' => 'При получении яблок возникла ошибка!']);
    }
    
    public function actionGenerateApples()
    {
        $apples = new Apples();
        
        return json_encode($apples->generate());
    }
    
    public function actionAppleFall()
    {
        if (Yii::$app->request->isAjax && Yii::$app->request->isPost) {
        
            if(Yii::$app->request->post('id')) {
                
                $id = Yii::$app->request->post('id');
                
                $apple = Apple::find()->where(['id' => $id])->one();
                
                if($apple !== null) {
    
                    $apple->status = Apple::STATUS_ON_GROUND;
                    $apple->fall_date = time();
                    
                    if($apple->save()) {
                        $apple = Apple::find()->where(['id' => $id])->asArray()->one();
                        return json_encode(['is_error' => false, 'apple' => $apple]);
                    }
                    else {
                        $messages = [];
                        foreach ($apple->getErrors () as $attribute => $error)
                        {
                            foreach ($error as $message)
                            {
                                $messages[] = ($attribute.": ".$message);
                            }
                        }
                        return ['is_error' => true, 'message' => implode('; ', $messages)];
                    }
                }
                else {
                    return json_encode(['is_error' => true, 'message' => 'Ошибка обновления статуса яблока!']);
                }
            }
            else {
                return json_encode(['is_error' => true, 'message' => 'Ошибка. В запросе отсутствует id яблока!']);
            }
            
        }
    
        return json_encode(['is_error' => true, 'message' => 'Ошибка обновления статуса яблока!']);
    }
    
    public function actionAppleEat()
    {
        if (Yii::$app->request->isAjax && Yii::$app->request->isPost) {
    
            if (Yii::$app->request->post('id') && Yii::$app->request->post('percent')) {
        
                $id = Yii::$app->request->post('id');
                $percent = Yii::$app->request->post('percent');
    
                $apple = Apple::find()->where(['id' => $id])->one();
    
                if($apple !== null) {
                    
                    $percent_number = $percent / 100;
                    
                    $apple_size = $apple->size - $percent_number;
                    
                    if($apple_size <= 0) {
                        if($apple->delete()) {
                            return json_encode(['is_error' => true, 'is_remove' => true, 'apple' => ['id' => $id]]);
                        }
                        else {
                            return json_encode(['is_error' => true, 'message' => 'Ошибка при попытке съесть яблоко!']);
                        }
                    }
                    else {
                        $apple->size = $apple_size;
    
                        if($apple->save()) {
                            $apple = Apple::find()->where(['id' => $id])->asArray()->one();
                            $apple['image'] = Apples::getPathImage($apple);
                            return json_encode(['is_error' => false, 'apple' => $apple]);
                        }
                        else {
                            $messages = [];
                            foreach ($apple->getErrors () as $attribute => $error)
                            {
                                foreach ($error as $message)
                                {
                                    $messages[] = ($attribute.": ".$message);
                                }
                            }
                            return ['is_error' => true, 'message' => implode('; ', $messages)];
                        }
                    }
                    
                }
                else {
                    return json_encode(['is_error' => true, 'message' => 'Ошибка при попытке съесть яблоко!']);
                }
                
            }
            else {
                return json_encode(['is_error' => true, 'message' => 'Ошибка. В запросе отсутствует id яблока или percent!']);
            }
        }
    
        return json_encode(['is_error' => true, 'message' => 'Ошибка при попытке съесть яблоко!']);
    }
}

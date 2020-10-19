<?php

use yii\helpers\Url;
use yii\helpers\Html;

/* @var $this yii\web\View */

$this->title = 'Apple';
?>
<div class="site-index">

    <div id="block_btn_generate_apples" style="display: none;">
        <div class="text-center form-group">
            <?= Html::button('Сгенерировать яблоки', ['class' => 'btn btn-primary', 'onclick' => 'generate_apples()']) ?>
        </div>
    </div>
    
    <div id="block_apples_on_tree" class="form-group">
    </div>
    
    <div id="block_tree" class="row col-md-12">
        <div class="text-center form-group">
            <?= Html::img(Url::base() . '/images/tree.jpg') ?>
        </div>
    </div>
    
    <div id="block_apples_on_ground" class="form-group row col-md-12">
    </div>
    
</div>

<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\bootstrap\Modal;

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

<div class="modal-apple-eat-percent">

    <?php Modal::begin([
        'id' => 'modal_eat_apple_percent',
        'header' => 'Выберите или введите в процентах, сколько нужно съесть яблока!',
        'footer' => '<div id="modal_text_error" class="text-center text-danger"></div>',
    ]); ?>

    <div>
        <?= Html::input('hidden', 'apple_eat_id', '', ['id' => 'apple_eat_id']) ?>
    </div>
    
    <div class="col-md-12 form-group">
        <div class="col-md-3">
            <?= Html::input('text', 'apple_eat_percent', '', ['id' => 'apple_eat_percent', 'class' => 'form-control']) ?>
        </div>
        
        <?= Html::button('25%', ['class' => 'btn btn-primary', 'onclick' => 'select_percent(25);']) ?>
        <?= Html::button('50%', ['class' => 'btn btn-primary', 'onclick' => 'select_percent(50);']) ?>
        <?= Html::button('75%', ['class' => 'btn btn-primary', 'onclick' => 'select_percent(75);']) ?>
    </div>
    
    <div>
        <?= Html::button('Съесть яблоко', ['class' => 'btn btn-success', 'onclick' => 'apple_eat_percent();']) ?>
    </div>

    <?php Modal::end(); ?>

</div>
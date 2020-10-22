<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "apple".
 *
 * @property int $id
 * @property int $color
 * @property float $size
 * @property int $status
 * @property string|null $fall_date
 * @property string $created_at
 * @property string|null $updated_at
 */
class Apple extends ActiveRecord
{
	const STATUS_ON_TREE = 1;
	const STATUS_ON_GROUND = 2;
	const STATUS_ROTTEN = 3;
	const COLOR_GREEN = 1;
	const COLOR_RED = 2;
	const COLOR_YELLOW = 3;
    
    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::class,
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                    'value' => time(),
                ],
            ],
        ];
    }
    
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'apple';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['color', 'size', 'status'], 'required'],
            [['color', 'status', 'fall_date', 'created_at', 'updated_at'], 'integer'],
            [['size'], 'number'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'color' => 'Color',
            'size' => 'Size',
            'status' => 'Status',
            'fall_date' => 'Fall Date',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}

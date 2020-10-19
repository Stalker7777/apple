$(document).ready(function(){
    get_apples();
});

function get_apples()
{
    $.ajax({
        url: 'admin/ajax/get-apples',
        method: 'get',
        'error': function() {
            alert('Ошибка выполнения запроса к серверу!');
        },
        'success': function(data) {
            var result = JSON.parse(data);
            //console.log(result.error);
            if(result.error) {
                alert(result.message);
            }
            else {
                btn_generate_apples_whow(result.count);
                create_apples(result.apples);
            }
        }
    });
}

function generate_apples()
{
    $.ajax({
        url: 'admin/ajax/generate-apples',
        method: 'get',
        'error': function() {
            alert('Ошибка выполнения запроса к серверу!');
        },
        'success': function(data) {
            var result = JSON.parse(data);
            if(result.is_error) {
                alert('При генерации яблок возникла ошибка!');
                console.log(result.message);
            }
            else {
                get_apples();
            }
        }
    });
}

function btn_generate_apples_whow(count)
{
    if(count > 0) {
        $('#block_btn_generate_apples').hide();
    }
    else {
        $('#block_btn_generate_apples').show();
    }
}

function create_apples(data)
{
    var apples = '';

    console.log(data);

    for(var i in data) {
        //console.log(data[i].id);
        apples += create_apple(data[i]);
    }

    $('#block_apples_on_tree').html(apples);
}

function create_apple(item)
{
    return '<div id="block_apple_' + item.id + '" class="col-md-4 form-group">'
        + '<input type="hidden" value="' + item.id + '">'
        + '<input type="hidden" value="' + item.status + '">'
        + '<input type="hidden" value="' + item.color + '">'
        + '<input type="hidden" value="' + item.size + '">'
        + '<img src="' + item.image + '" width="64px" height="64px" alt="apple">'
        + '<button class="btn btn-default" onclick="apple_fall(' + item.id + ')">Упасть</button>'
        + '<button class="btn btn-primary" onclick="apple_eat()">Съесть</button>'
        + '</div>';
}

function apple_fall(id)
{
    if(confirm('Это яблоко должно упасть?')) {

        // проверяем чтобы статус яблока был на девере, иначе сообщение, что упасть уже не может

        // сделать запрос на сервер
        // поменять статус яблока

        // закинуть новый статус в яблоко

        apple_fall_update(id);

    }
}

function apple_fall_update(id)
{
    var apple = $('#block_apple_' + id);

    $('#block_apples_on_ground').append(apple);

    $('#block_apples_on_tree').children('#block_apple_' + id).remove();
}

function apple_eat(id)
{

}

function apple_eat_percent(id, percent)
{

}

function apple_eat_update(id, image)
{

}
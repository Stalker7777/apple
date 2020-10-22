$(document).ready(function(){
    get_apples();
    apples_rotten();
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
            if(result.is_error) {
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
    var apples_on_tree = '';
    var apples_on_ground = '';

    //console.log(data);

    for(var i in data) {
        if(data[i]['status'] == 1) {
            apples_on_tree += create_apple(data[i]);
        }
        else {
            apples_on_ground += create_apple(data[i]);
        }
    }

    $('#block_apples_on_tree').html(apples_on_tree);
    $('#block_apples_on_ground').html(apples_on_ground);
}

function create_apple(item)
{
    return '<div id="block_apple_' + item.id + '" class="col-md-4 form-group">'
        + '<input type="hidden" value="' + item.id + '">'
        + '<input id="apple_status_' + item.id + '" type="hidden" value="' + item.status + '">'
        + '<input type="hidden" value="' + item.color + '">'
        + '<input id="apple_size_' + item.id + '" type="hidden" value="' + item.size + '">'
        + '<img id="apple_image_' + item.id + '" src="' + item.image + '" width="64px" height="64px" alt="apple">'
        + '<button class="btn btn-default" onclick="apple_fall(' + item.id + ')">Упасть</button>'
        + '<button class="btn btn-primary" onclick="apple_eat(' + item.id + ')">Съесть</button>'
        + '</div>';
}

function apple_fall(id)
{
    var apple_status = $('#apple_status_' + id).val();

    if(apple_status > 1) {
        alert('Яблоко не на дереве, поэтому упасть уже не может!');
        return;
    }

    if(confirm('Это яблоко должно упасть?')) {
        $.ajax({
            url: 'admin/ajax/apple-fall',
            method: 'post',
            data: { 'id': id },
            'error': function() {
                alert('Ошибка выполнения запроса к серверу!');
            },
            'success': function(data) {
                var result = JSON.parse(data);
                if(result.is_error) {
                    alert('При обновлении статуса яблока возникла ошибка!');
                    console.log(result.message);
                }
                else {
                    apple_fall_update(result.apple);
                }
            }
        });
    }
}

function apple_fall_update(data)
{
    var id = data['id'];

    $('#apple_status_' + id).val(data['status']);

    var apple = $('#block_apple_' + id);

    $('#block_apples_on_ground').append(apple);

    $('#block_apples_on_tree').children('#block_apple_' + id).remove();
}

function apple_eat(id)
{
    var apple_status = $('#apple_status_' + id).val();

    if(apple_status != 2) {

        if(apple_status == 1) {
            alert('Яблоко съесть нельзя! Яблоко на девере!');
            return;
        }
        if(apple_status == 3) {
            alert('Яблоко съесть нельзя! Яблоко гнилое!');
            return;
        }

        alert('Яблоко съесть нельзя!');
        return;
    }

    $('#apple_eat_id').val(id);
    $('#modal_eat_apple_percent').modal('show');
}

function select_percent(percent)
{
    $('#apple_eat_percent').val(percent);
}

function apple_eat_percent()
{
    var id = $('#apple_eat_id').val();
    var percent = $('#apple_eat_percent').val();

    if(percent.length == 0) {
        $('#modal_text_error').html('Выберите или введите значение в диапазоне от 0 до 100 включительно!');
        return;
    }

    if(percent <= 0 || percent > 100) {
        alert('dsfsdf');
        $('#modal_text_error').html('Введите значение в диапазоне от 0 до 100 включительно!');
        return;
    }

    $('#modal_eat_apple_percent').modal('hide');

    $.ajax({
        url: 'admin/ajax/apple-eat',
        method: 'post',
        data: { 'id': id, 'percent': percent },
        'error': function() {
            alert('Ошибка выполнения запроса к серверу!');
        },
        'success': function(data) {
            var result = JSON.parse(data);

            if(result.is_error) {

                if(result.is_remove) {
                    alert('Яблоко было съедено полностью!');
                    apple_remove(result.apple);
                }
                else {
                    alert('При попытки съесть яблоко возникла ошибка!');
                    console.log(result.message);
                }

            }
            else {
                apple_eat_update(result.apple);
            }
        }
    });
}

function apple_eat_update(data)
{
    var id = data['id'];
    var size = data['size'];
    var image = data['image'];

    $('#apple_size_' + id).val(size);
    $('#apple_image_' + id).attr('src', image);
}

function apple_remove(data) {
    var id = data['id'];

    $('#block_apples_on_ground').children('#block_apple_' + id).remove();
}

function apples_rotten()
{
    $.ajax({
        url: 'admin/ajax/apples-rotten',
        method: 'get',
        'error': function() {
            alert('Ошибка выполнения запроса к серверу!');
        },
        'success': function(data) {
            var result = JSON.parse(data);

            if(result.is_error) {
                console.log(result.message);
            }
            else {
                apples_rotten_update(result.apples);
            }
            setTimeoutRotten();
        }
    });
}

function setTimeoutRotten()
{
    setTimeout(apples_rotten, 60000);
}

function apples_rotten_update(data)
{
    for(var i in data) {
        apple_rotten_update(data[i]);
    }
}

function apple_rotten_update(item)
{
    var id = item['id'];
    var status = item['status'];
    var image = item['image'];

    $('#apple_status_' + id).val(status);
    $('#apple_image_' + id).attr('src', image);
}

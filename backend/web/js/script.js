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

    console.log(data);

    for(var i in data) {
        //console.log(data[i].id);
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
        + '<input type="hidden" value="' + item.size + '">'
        + '<img src="' + item.image + '" width="64px" height="64px" alt="apple">'
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
                console.log(data);
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

}

function apple_eat_percent(id, percent)
{

}

function apple_eat_update(id, image)
{

}
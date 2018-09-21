function getFormsData (formId) {
    var $inputs = $(`#${formId} :input`);
    var values = {};

    $inputs.each(function() {
        if($(this).val()) {
            values[this.name] = $(this).val();
        }
    });

    return values;
}

function acceptBook (id) {
    $.ajax({
        method: 'GET',
        url: `/acceptBookAuto?id=` + id,
    })
}
function send(data) {
    $.ajax({
        method: 'POST',
        url: '/acceptBookFormOne',
        data: data,
        success: function (data) {
            location.reload();
        },
        error: function (err) {
            $('#savError').text('error saving to the data base');
            window.scrollTo(0, 0);

        }
    })
}


$('#accept').submit(function (e) {
    let values = getFormsData('accept');
    let data = {};

    data['bookId'] = values['bookId'].trim();
    data['name'] = values['driverName'].trim();
    data['phone'] = values['driverPhone'].trim();
    data['car'] = values['driverCar'].trim();
    data['companyId'] = values['companyId'].trim();

    send(data);
});

$('#acceptt').submit(function (e) {
    let values = getFormsData('acceptt');
    let data = {};

    data['bookId'] = values['bookId'].trim();

    $.ajax({
        method: 'POST',
        url: '/completeBook',
        data: data,
        success: function (data) {
            location.reload();
        },
        error: function (err) {
            $('#savError').text('error saving to the data base');
            window.scrollTo(0, 0);

        }
    })
});
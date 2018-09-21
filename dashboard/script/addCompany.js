$(document).ready(function () {
    var $uploadCrop;

    function send(data) {
        $.ajax({
            method: 'POST',
            url: '/addCompany',
            data: data,
            success: function (data) {
                $('#savError').text('');
                $('#firas').trigger("reset");
                $('.upload-demo').removeClass('ready');
                $('#upload').val(''); // this will clear the input val.
                $uploadCrop.croppie('bind', {
                    url : ''
                })
                $('#serSucMessage').text('saved Successfully');
                window.scrollTo(0, 0);
            },
            error: function (err) {
                $('#savError').text('error saving to the data base');
                window.scrollTo(0, 0);

            }
        })
    }

    function readFile(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                });
                $('.upload-demo').addClass('ready');
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $uploadCrop = $('#upload-demo').croppie({
        viewport: {
            width: 200,
            height: 200,
            type: 'circle'
        },
        boundary: {
            width: 300,
            height: 300
        }
    });
    $('#upload').on('change', function () {
        readFile(this);
    });

    $('#firas').submit(function (e) {
        let values = getFormsData('firas');
        let error = false;


        let checked = [];
        $('#firas input:checked').each(function () {
            checked.push($(this).attr('value'))
        });

        if(!(/[\u0600-\u06FF]/.test(values['name_arabic']))) {
            error = true;
            $('#serErrMessage').text('Arabic name must be in Arabic');
            return;
        }

        let data = {};

        data['name'] = values['name'].trim();
        data['name_arabic'] = values['name_arabic'].trim();
        data['email'] = values['email'].trim();
        data['phone'] = values['phone'].trim();
        if (values['description']) {
            data['description'] = values['description'].trim();
        }
        if (values['description_arabic']) {
            data['description_arabic'] = values['description_arabic'].trim();
        }
        data['location'] = $('#location').val();
        data['service'] = [];

        if (checked.length > 0) {
            checked.forEach((val) => {
                if (values[`${val}_price`]) {
                    data['service'].push({
                        service: val,
                        id: values[`${val}_id`],
                        description: values[`${val}_desc`] ? values[`${val}_desc`].trim() : null,
                        description_arabic: values[`${val}_desc_arabic`] ? values[`${val}_desc_arabic`].trim() : null,
                        price: values[`${val}_price`].trim()
                    });
                } else {
                    error = true;
                    $('#serErrMessage').text('you need to add Price \nto each checked service');
                    return;
                }
                $('#serErrMessage').text('');
            });
        } else {
            error = true;
            $('#serErrMessage').text('you need to add at least one service to the new company');
        }

        if (error) {
            return;
        }

        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'original'
        }).then(function (resp) {
            data['image'] = resp;

            send(data);
        });
    });
});

function check(id) {
    if ($(".input_" + id).hasClass("d-none")) {
        $(".input_" + id).removeClass("d-none")
    } else {
        $(".input_" + id).addClass("d-none")
    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("company_table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function send(data) {
    $.ajax({
        method: 'POST',
        url: '/editCompany?id=' + $('#id').val(),
        data: data,
        success: function (data) {
            $('#firas').trigger("reset");
            $('#serSucMessage').text('saved Successfully');
            window.scrollTo(0, 0);
        },
        error: function (err) {
            $('#savError').text('error saving to the data base');
            window.scrollTo(0, 0);

        }
    })
}
function sendServices(data) {
    $.ajax({
        method: 'POST',
        url: '/editCompanyService?id=' + $('#id').val(),
        data: data,
        success: function (data) {
            location.reload();
            $('#serSucMessage').text('saved Successfully');
            window.scrollTo(0, 0);
        },
        error: function (err) {
            $('#savError').text('error saving to the data base');
            window.scrollTo(0, 0);

        }
    })
}


$('#firas').submit(function (e) {
    let values = getFormsData('firas');
    let error = false;

    let data = {};

    data['name'] = values['name'].trim();
    data['name_arabic'] = values['name_arabic'].trim();
    data['email'] = values['email'].trim();
    data['phone'] = values['phone'].trim();
    data['description'] = values['description'] ? values['description'].trim() :  null;
    data['description_arabic'] = values['description_arabic'] ? values['description_arabic'].trim() : null;
    data['location'] = $('#location').val();

    if (error) {
        return;
    }

    send(data);
});

function check(id) {
    if ($(".input_" + id).hasClass("d-none")) {
        $(".input_" + id).removeClass("d-none")
    } else {
        $(".input_" + id).addClass("d-none")
    }
}

$('#service').submit(function (e) {
    let values = getFormsData('service');
    let error = false;

    let data = {};
    let checked = [];
    $('#service input:checked').each(function () {
        checked.push($(this).attr('value'))
    });

    data['service'] = [];

    if (checked.length > 0) {
        checked.forEach((val) => {
            if (values[`${val}_desc`] && values[`${val}_price`]) {
                data['service'].push({
                    service: val,
                    id: values[`${val}_id`],
                    description: values[`${val}_desc`].trim(),
                    description_arabic: values[`${val}_desc_arabic`].trim(),
                    price: values[`${val}_price`].trim()
                });
            } else {
                error = true;
                $('#serErrMessage').text('you need to add Price and Description \nto each checked service');
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

     sendServices(data);
});

$('#editPrice').submit(function (e) {
    let values = getFormsData('editPrice');
    $.ajax({
        method: 'POST',
        url: '/editServicesPrices?',
        data: values,
        success: function (data) {
            location.reload();
            $('#serSucMessage').text('saved Successfully');
            window.scrollTo(0, 0);
        },
        error: function (err) {
            $('#savError').text('error saving to the data base');
            window.scrollTo(0, 0);

        }
    })
});

function deleteCompany (id) {
    let confirmation = confirm('deleting a company will also result \nto deleting its services and books \nmade by users \n are you sure ?')
    if (confirmation) {
        $.ajax({
            method: 'DELETE',
            url: '/deleteCompany?id=' + id,
            success: function (data) {
                location.reload();
                alert('Deleted Successfully');
                window.scrollTo(0, 0);
            },
            error: function (err) {
                $('#savError').text('error saving to the data base');
                window.scrollTo(0, 0);

            }
        })
    } else {
        alert('fine');
    }
}
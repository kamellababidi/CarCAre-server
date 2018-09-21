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
$(function (){
	const $form = $('#form-validate'),
        $formGroup = $form.find('.form-group')

        $.extend(window.Parsley.options, {
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            validationThreshold:0,
            classHandler: function(ParsleyField) {
                return ParsleyField.$element.parents('.form-control')
            },
            errorsContainer: function(ParsleyField) {
                const $formColumn = ParsleyField.$element.parents('.form-group').find('.col-sm-10')
                if ($formColumn.length) return $formColumn
                return ParsleyField.$element.parents('.form-group')
            },
            errorsWrapper: '<div class="invalid-feedback d-block"></div>',
            errorTemplate: '<div></div>'
        })

        $form.parsley()

        $form.on('submit', function (e) {
        	e.preventDefault();

                let firstName = $("#iFirstName").val()
	            , lastName = $("#iLastName").val()
	            , email = $("#iEmail").val()
	            , message = $("#iMessage").val();

	            $.ajax({
	                url: "https://be-ahmadsuherman.herokuapp.com/api/feedback",
	                method: "POST",
	                cache: false,
	                data: {
	                    first_name: firstName,
	                    last_name: lastName,
	                    email: email,
	                    message: message,
	                    // _token: _token,
	                },
	                beforeSend: function() {
	                    $('.btn[type="submit"]').attr('disabled', true).html('<span class="fa fa-spinner fa-spin"></span>')
	                },
	                success: function(success) {

	                    $('#form-validate')[0].reset();
	                    $('#form-validate').parsley().reset();

	                    let lastName = success.data.last_name
	                    if(lastName == null)
	                    {
	                    	lastName = '';
	                    }

	                    toastr.success('Umpan balik ' + success.data.first_name + ' ' + lastName + ' ' + ' berhasil terkirim!');
	                },
	                error: function(error) {
	                	if(error.status == 400)
	                	{
	                		toastr.error(error.responseJSON.error);
	                	}

	                	if(error.status == 500)
	                	{
	                		toastr.error(error.statusText)
	                	}
	                }
	            }).always(function(){
	            	$('.btn[type="submit"]').attr('disabled', false).html('Simpan')
	            })
        })
})
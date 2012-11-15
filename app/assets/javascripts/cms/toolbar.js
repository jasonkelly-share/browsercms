//
//  A manifest file for all CMS toolbar related js.
//= require jquery
//= require jquery-ui
//= require jquery.cookie
//= require jquery.selectbox
//= require jquery.taglist
//= require cms/core_library
//= require cms/attachment_manager
//= require bootstrap


// Add an information popup to the Edit Properties button on the Page Toolbar
$(function () {
    $('#edit_properties_button').popover({placement:'bottom'});
});

jQuery(function ($) {

    $.cms_ajax = {
        // Add the CSRF token to an AJAX/JSON request.
        setup:function () {
            $.ajaxSetup({
                beforeSend:function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
                    xhr.setRequestHeader("Accept", "application/json");
                }
            });
        },

        // Invoke a Rails aware (w/ CSRF token) PUT request.
        put:function (path, success) {
            $.cms_ajax.setup();
            $.ajax({
                type:'POST',
                url:path,
                data:{ _method:'PUT'},
                success:success
            });

        },
        // Invoke a Rails aware (w/ CSRF token) DELETE request.
        delete:function (path, success) {
            $.cms_ajax.setup();
            $.ajax({
                type:'POST',
                url:path,
                data:{ _method:'DELETE'},
                success:success
            });

        }
    };

    $.cms_editor = {
        // Returns the widget that a user has currently selected.
        // @return [JQuery.Element]
        selectedElement:function () {
            return $($('#mercury_iframe').contents()[0].activeElement);
        },
        // Most updates will need to reload the page. This function can be passed as a handler to ajax requests.
        reload:function (data) {
            window.location.reload();
        }
    };
});


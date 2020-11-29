// handle view list-chapter in story-page
if ($(window).width() <= 416) {
    $(".manga-view").hide();
}

// handle btn show-more or show-less in description-manga-detail of story-page
if ($("#description_content").text().length <= 510) {
    $("#btn_toggle_showmore").hide();
}
$("#btn_toggle_showmore").click(function () {
    $(this).toggleClass("active-toggle");
    $("#description_content").toggleClass("hide-content");
    if ($("#btn_toggle_showmore").hasClass("active-toggle")) {
        $(".toggle_text").text('<%= CONSTANT.SHOW_LESS %>');
    }
    else {
        $(".toggle_text").text('<%= CONSTANT.SHOW_MORE %>');
    }
});

// handle select chapter in dropdown of chapter-detail
$('#dynamic_select_top, #dynamic_select_bottom').on('change', function () {
    var url = $(this).val(); // get selected value
    if (url) { // require a URL
        window.location = url; // redirect
    }
    return false;
});
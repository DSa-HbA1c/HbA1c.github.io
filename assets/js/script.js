jQuery(function($) {
    $("input[name=type]").change(function() {
        $("input[name=type]").each(function() {
            $(this).parent().removeClass("active");
        });
        $(this).parent().addClass("active");
    });

    $("#cva-select").change(function() {
        let target = $(this).val();
        console.log(target);
        if (target === "-1") {
            $(".custom-cva").show();
        } else {
            $(".custom-cva").hide();
        }
    });
});
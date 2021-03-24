


$( document ).ready(function() {

    var canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    var img = document.getElementById('image');
    var cross_size = 5;

    ctx.drawImage(img, 0, 0, 300, 300);
    
    $("#gallons").val(500);
    $("#pixel_offset").val(2);
    
    class Cross{

        constructor(center_x, center_y) {
            this.center_x = center_x;
            this.center_y = center_y;
        }

        draw(){

            var cross_x0 = this.center_x + cross_size;
            var cross_x1 = this.center_x - cross_size;
            var cross_y0 = this.center_y + cross_size;
            var cross_y1 = this.center_y - cross_size;

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 0, 255, 1)';
            ctx.lineWidth = 1;
            ctx.lineCap = "butt";
            ctx.moveTo(cross_x0, this.center_y);
            ctx.lineTo(cross_x1, this.center_y);
            ctx.moveTo(this.center_x, cross_y0);
            ctx.lineTo(this.center_x, cross_y1);
            ctx.stroke();

        }
    }
    
    class OilCoord{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }

        get color(){
            return ctx.getImageData(this.x, this.y, 1, 1).data[0]
        }

        draw(){
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + 1, this.y + 1);
            ctx.stroke();
        }

        static calculate_lowest_point(current_x, current_y){

            var pixel_offset = parseInt($("#pixel_offset").val());

            if (pixel_offset > 10){
                pixel_offset = 10;
                $("#pixel_offset").val(10);
            }

            if (pixel_offset <= 1){
                pixel_offset = 2;
                $("#pixel_offset").val(2);
            }

            var coords_array = [];
            for(var i = 0; i < pixel_offset; i++){
                for(var j = 0; j < pixel_offset; j++){
                    if(i > 0 || j > 0 || pixel_offset == 1){
                        coords_array.push(new OilCoord(current_x + i, current_y + j));
                        coords_array.push(new OilCoord(current_x - i, current_y - j));
                        coords_array.push(new OilCoord(current_x - i, current_y + j));
                        coords_array.push(new OilCoord(current_x + i, current_y - j));
                    }
                }
            }

            if(coords_array.length == 0){
                coords_array.push(new OilCoord(current_x, current_y))
            }

            var lowest_point = null;
            for (let point of coords_array) {

                if (lowest_point == null || point.color < lowest_point.color){
                    lowest_point = point;
                }else if (point.color == lowest_point.color &&  point.x != lowest_point.x && point.y != lowest_point.y ){
                    lowest_point = point;
                }
            }
            return lowest_point;
        }
    }

    $("#clear").click(function(e) {
        ctx.clearRect(0, 0, 300, 300);
        ctx.drawImage(img, 0, 0, 300, 300);
    });

    
    $("#canvas").click(function(e) {

        var x = parseInt($("#posx").val());
        var y = parseInt($("#posy").val());
        var delay = parseInt($("#delay").val());

        var center_x = x;
        var center_y = parseInt((y / 2) - (y / 100));

        ctx.clearRect(0, 0, 300, 300);
        ctx.drawImage(img, 0, 0, 300, 300);

        var current_x = center_x;
        var current_y = center_y;
        var gallons = parseInt($("#gallons").val());

        if(gallons > 5000){
            gallons = 5000;
            $("#gallons").val(5000)
        }

        for(var i = 0; i < gallons; i ++){
            var lowest_point = OilCoord.calculate_lowest_point(current_x, current_y);

            lowest_point.draw();
            
            current_x = lowest_point.x;
            current_y = lowest_point.y;
        }

        new Cross(center_x, center_y).draw();

    });


    $("#canvas").mousemove(function(e){

        $("#posx").val(e.offsetX);
        $("#posy").val(e.offsetY);

    });

});
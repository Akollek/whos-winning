function center_percents(){
    ['dem', 'gop'].map(function(s) {
        var id = s+'-percent';
        var l = (window.innerWidth/2 - $('#'+id).width() - 70) + 'px';
        document.getElementById(id).style[s == 'dem' ? 'left' : 'right'] = l; 
    });
}
function set_percents(dem, gop) {
    $('#dems').width(dem + '%');
    $('#dem-percent').html(Math.round(dem*10)/10 + '%');
    $('#gop').width(gop + '%');
    $('#gop-percent').html(Math.round(gop*10)/10 + '%');
}
function get_percents(){
    $.ajax({
        type: 'GET',
        url: 'http://projects.fivethirtyeight.com/2016-election-forecast/',
        dataType: 'html',
        success: function(data) {
            var dem_re = /data-party="D" class="candidate-val winprob">(\d{2}\.\d)/;
            var dem = parseFloat(dem_re.exec(data)[1]);
            set_percents(dem, 100-dem);
            center_percents();
        }
    });
}
$(document).ready(get_percents);


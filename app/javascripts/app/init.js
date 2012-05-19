

$(function(){
    
    window.isLogging = false;
    window.$log = $('<div style="position:absolute;right:10px;bottom:0;z-index:99;color:pink;font-size:10px;line-height:10px;" />');
    
    window.log = function (val) {
        if (!window.isLogging) return;
        $log.prepend('<div>' + val + '</div>');
    };
    
    window.log('dom ready');
    
    var data = [
            {
                name: 'Drink alcohol',
                cheatsPerRange: 1,
                range: 7,
                start: '2012-04-23',
                used: ['2012-04-24']
            },
            {
                name: 'Smoke cigarettes',
                cheatsPerRange: 1,
                range: 7,
                start: '2012-05-01',
                used: ['2012-05-03', '2012-05-02']
            },
            {
                name: 'Skip workout',
                cheatsPerRange: 1,
                range: 7,
                start: '2012-04-08',
                used: ['2012-04-23']
            },
            {
                name: 'Do something',
                cheatsPerRange: 1,
                range: 7,
                start: '2012-04-22',
                used: ['2012-05-01']
            }
        ],
        vices = new Vices(),
        appView = new AppView({
            model: new window.App(),
            collection: vices
        });
    
    $(document.body)
        .html(appView.render().el)
        ;
    
    vices.fetch({
        success: function () {
            
            if (false)
            {
                vices.each(function(v){
                    v.destroy();
                });
                
                vices.create(data[0]);
            }
            
        }
    })
    
    document.addEventListener('resume', function(){
        window.log('resume');
        vices.fetch();
        
    }, false);
    
    $(document.body).append($log);
});
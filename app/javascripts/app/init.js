window.isDebugging = false;
window.isLogging = false;
window.log = function (val) {
    if (!window.isLogging) return;
    $log.append('<div>' + val + '</div>');
};
window.clearLocalStorage = function () {
    for (var i = 0; i < localStorage.length; i++)
    {
        (function(){
            
            var key = localStorage.key(i);
            
            if (key.indexOf('Vices') < 0)
            {
                return;
            }
            
            localStorage.removeItem(key);
            
        })();
    }
};

if (isDebugging)
{
    clearLocalStorage();
}

$(function(){
    
    window.$log = $('<div style="position:absolute;right:10px;bottom:0;z-index:99;color:pink;font-size:10px;line-height:10px;" />');
    window.log('dom ready');
    
    var data = [
            {
                name: 'Drink alcohol',
                cheatsPerRange: 1,
                range: 7,
                start: '2012-05-25',
                used: ['2012-05-25']
            }/*,
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
            }*/
        ],
        vices = new Vices(),
        appView = new AppView({
            model: new window.App(),
            collection: vices
        });
    
    $(document.body)
        .html(appView.render().el)
        ;
    
    var success = function () {
        if (isDebugging)
        {
            vices.each(function(v){
                v.destroy();
            });
            
            vices.create(data[0]);
        }
    };
    
    if (!isDebugging)
    {
        vices.fetch()
    }
    else
    {
        vices.reset(data);
    }
    
    document.addEventListener('resume', function(){
        
        window.log('resume');
        
        if (!isDebugging)
        {
            vices.fetch()
        }
        else
        {
            vices.reset(data);
        }
        
    }, false);
    
    $(document.body).append($log);
});
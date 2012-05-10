$(function(){
    
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
        vices = new Vices(data),
        appView = new AppView({
            collection: vices
        });
    
    window.$debug = $('<div class="debug"></div>');
    
    $(document.body)
        .html(appView.render().el)
        .append(window.$debug)
        .trigger('indom')
        ;
    
    //vices.reset(data);
    
    document.addEventListener('resume', function(){
        
        vices.reset(data);
        
        $(document.body)
            .trigger('indom')
            ;
        
    }, false);
    
});
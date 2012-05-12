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
        vices = new Vices(),
        appView = new AppView({
            model: new window.App(),
            collection: vices
        });
    
    $(document.body)
        .html(appView.render().el)
        ;
    
    vices.reset(data);
    
    document.addEventListener('resume', function(){
        
        vices.reset(data);
        
    }, false);
    
});
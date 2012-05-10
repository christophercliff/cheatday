(function(){
    
    window.AppView = Backbone.View.extend({
        
        className: 'application',
        
        initialize: function () {
            
            var self = this;
            
            self.collection = self.options.collection;
            
            self.collection
                .bind('add', self.add, self)
                ;
            
            return;
        },
        
        render: function () {
            
            var self = this;
            
            self.$el
                .empty()
                ;
            
            self.collection.each(function(vice){
                
                self.$el
                    .append(new ViceView({
                        model: vice
                    }).render().el)
                    ;
                
            });
            
            self.$el
                .append(new CreateView({
                    collection: self.collection
                }).render().el)
                ;
            
            return self;
        },
        
        add: function (vice) {
            
            var self = this;
            
            self.$el
                .append(new ViceView({
                    model: vice
                }).render().el)
                ;
            
            return;
        }
        
    });
    
})();
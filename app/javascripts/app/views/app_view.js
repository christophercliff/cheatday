(function(){
    
    window.AppView = Backbone.View.extend({
        
        className: 'app',
        
        initialize: function () {
            
            var self = this;
            
            self.template = JST[self.className];
            self.collection = self.options.collection;
            
            self.model
                .bind('change:isCreating', self.change_IsCreating, self)
                ;
            
            self.collection
                .bind('reset add', self.render, self)
                .bind('reset add', self.bindTouch, self)
                ;
            
            return;
        },
        
        render: function () {
            
            var self = this,
                $vices;
            
            self.$el
                .html(self.template.render())
                ;
            
            $vices = self.$('.vice-collection')
            
            self.collection.each(function(vice){
                
                $vices
                    .append(new ViceView({
                        model: vice,
                        app: self.model
                    }).render().el)
                    ;
                
            });
            
            self.$el
                .append(new CreateView({
                    collection: self.collection,
                    app: self.model
                }).render().el)
                ;
            
            return self;
        },
        
        bindTouch: function () {
            
            var self = this;
            
            self.model
                .trigger('bindTouch')
                ;
            
            return;
        },
        
        change_IsCreating: function () {
            
            var self = this;
            
            if (self.model.get('isCreating'))
            {
                self.collection.spread();
                
                return;
            }
            
            self.collection.unspread();
            
            return;
        }
        
    });
    
})();
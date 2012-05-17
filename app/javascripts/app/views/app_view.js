(function(){
    
    window.AppView = Backbone.View.extend({
        
        className: 'app',
        
        initialize: function () {
            
            var self = this;
            
            self.template = JST[self.className];
            self.collection = self.options.collection;
            
            /*self.$el
                .css({
                    height: $(window).height() + 'px'
                })
                ;*/
            
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
            
            var self = this;
            
            self.$el
                .html(self.template.render())
                ;
            
            self.renderVices();
            self.renderCreate();
            
            return self;
        },
        
        renderCreate: function () {
            
            var self = this;
            
            self.$el
                .append(new window.CreateView({
                    collection: self.collection,
                    app: self.model
                }).render().el)
                ;
            
            return;
        },
        
        renderVices: function () {
            
            var self = this,
                $vices = self.$('.vice-collection');
            
            self.collection.each(function(vice){
                
                $vices
                    .append(new ViceView({
                        model: vice,
                        app: self.model
                    }).render().el)
                    ;
                
            });
            
            return;
        },
        
        bindTouch: function () {
            
            var self = this;
            
            self.model
                .trigger('bindTouch')
                ;
            
            return;
        },
        
        change_IsCreating: function () {
            return;
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
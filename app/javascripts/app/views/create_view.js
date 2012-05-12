(function(){
    
    window.CreateView = Backbone.View.extend({
        
        className: 'create',
        
        events: {
            'click .create-toggle': 'toggle'
        },
        
        initialize: function () {
            
            var self = this;
            
            self.template = JST[self.className];
            self.app = self.options.app;
            
            self.$el.get(0).addEventListener('webkitTransitionEnd', function(e){
                
                if (self.$el.css('-webkit-transform') === 'matrix(1, 0, 0, 1, 0, 0)')
                {
                    return;
                }
                
                self.edit();
            });
            
            return;
        },
        
        render: function () {
            
            var self = this;
            
            self.$el
                .html(self.template.render())
                ;
            
            return self;
        },
        
        toggle: function () {
            
            var self = this,
                dy;
            
            if (self.app.get('isCreating'))
            {
                dy = 0;
            }
            else
            {
                dy = -self.$el.offset().top
            }
            
            self.app
                .set({
                    isCreating: !self.app.get('isCreating')
                })
                ;
            
            self.$el
                .css('-webkit-transform', 'translate3d(0, ' + dy + 'px, 0)')
                ;
            
            return;
        },
        
        edit: function () {
            
            var self = this;
            
            self.$('input')
                .focus()
                ;
            
            return;
        }
        
    });
    
})();
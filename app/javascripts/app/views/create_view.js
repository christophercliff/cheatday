(function(){
    
    window.CreateView = Backbone.View.extend({
        
        className: 'create',
        
        tagName: 'form',
        
        events: {
            'click .create-toggle': 'toggle',
            'blur input': 'blur'
        },
        
        initialize: function () {
            
            var self = this;
            
            _.bindAll(self, 'blur', 'transitionStart', 'transitionEnd');
            
            self.template = JST[self.className];
            self.app = self.options.app;
            self.collection = self.options.collection;
            
            self.$el.get(0).addEventListener('webkitTransitionStart', self.transitionStart);
            self.$el.get(0).addEventListener('webkitTransitionEnd', self.transitionEnd);
            
            self.top_0 = $(window).height() - 60;
            
            self.$el
                .css({
                    '-webkit-transform': 'translate3d(0, ' + self.top_0 + 'px, 0)'
                })
                ;
            
            return;
        },
        
        transitionStart: function () {
            
            var self = this;
            
            self.isTransitioning = true;
            
            return;
        },
        
        transitionEnd: function () {
            
            var self = this;
            
            self.isTransitioning = false;
            
            if (self.app.get('isCreating'))
            {
                self.edit();
            }
            
            return;
        },
        
        render: function () {
            
            var self = this;
            
            self.$el
                .html(self.template.render())
                ;
            
            self.$input = self.$('input');
            
            return self;
        },
        
        toggle: function () {
            
            var self = this,
                dy;
            
            if (self.isTransitioning)
            {
                return;
            }
            
            self.app
                .set({
                    isCreating: !self.app.get('isCreating')
                })
                ;
            
            if (self.app.get('isCreating'))
            {
                dy = 0;
            }
            else
            {
                dy = self.top_0;
            }
            
            self.$el
                .css({
                    '-webkit-transform': 'translate3d(0, ' + dy + 'px, 0)'
                })
                ;
            
            return;
        },
        
        edit: function () {
            return;
            var self = this;
            
            self.$input
                .focus()
            .get(0)
                .select()
                ;
            
            return;
        },
        
        blur: function () {
            
            var self = this,
                val = self.$input.val();
            
            /*if (val !== ''
                && !self.collection.has(val))
            {
                self.collection
                    .add({
                        name: val
                    })
                    ;
            }*/
            
            self.toggle();
            
            return;
        },
        
    });
    
})();
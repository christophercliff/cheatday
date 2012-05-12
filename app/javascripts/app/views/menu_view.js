(function(){
    
    window.MenuView = Backbone.View.extend({
        
        className: 'menu',
        
        events: {
            'click': 'click',
            'blur input': 'blur',
            'keypress': 'keypress'
        },
        
        initialize: function () {
            
            var self = this;
            
            self.app = self.options.app;
            self.collection = self.options.collection;
            
            return;
        },
        
        render: function () {
            
            var self = this;
            
            self.$el
                .html('+')
                ;
            
            return self;
        },
        
        click: function (e) {
            e.preventDefault();
            
            var self = this;
            
            if (self.app.get('isEditing')
                || self.app.get('isCreating'))
            {
                return;
            }
            
            self.app
                .set({
                    isCreating: true
                })
                ;
            
            self.$el
                .addClass(self.className + '-focus')
                .html('<input maxlength="15" />')
                ;
            
            self.$('input')
                .focus()
                ;
            
            return;
        },
        
        blur: function () {
            
            var self = this,
                val = self.$('input').val();
            
            self.app
                .set({
                    isCreating: false
                })
                ;
            
            self.$el
                .removeClass(self.className + '-focus')
                .html('+')
                ;
            
            if (_.isEmpty(val)
                || self.collection.has(val))
            {
                return;
            }
            
            self.collection
                .add({
                    name: val
                })
                ;
            
            return;
        },
        
        keypress: function (e) {
            
            var self = this;
            
            if (e.keyCode === 13)
            {
                //self.blur();
            }
            
            return;
        }
        
    });
    
})();
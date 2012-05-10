(function(){
    
    var isCreating = false;
    
    window.CreateView = Backbone.View.extend({
        
        className: 'create',
        
        events: {
            'click': 'click',
            'blur input': 'blur',
            'keypress': 'keypress'
        },
        
        initialize: function () {
            
            var self = this;
            
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
            
            if (isCreating)
            {
                return;
            }
            
            self.collection
                .trigger('collection_spread')
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
            
            isCreating = false;
            
            self.$el
                .removeClass(self.className + '-focus')
                .html('+')
                ;
            
            self.collection
                .trigger('collection_unspread')
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
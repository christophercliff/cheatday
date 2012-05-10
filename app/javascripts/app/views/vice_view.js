(function(){
    
    var NAME = 'vice',
        C_ACTIVE = NAME + '-active',
        C_FADE = NAME + '-fade',
        getClass = function (state) {
            return NAME + ' ' + NAME + '-' + state;
        },
        isEditing = false;
    
    window.ViceView = Backbone.View.extend({
        
        className: NAME,
        
        events: {
            'blur input': 'blur'
        },
        
        initialize: function () {
            
            var self = this;
            
            _.bindAll(self, 'indom', 'touch');
            
            self.template = JST[NAME];
            
            self.model
                .bind('change:isSwiping', self.change_isSwiping, self)
                .bind('change:state', self.change_state, self)
                .bind('change:index', self.sort, self)
                .bind('spread', self.spread, self)
                .bind('unspread', self.sort, self)
                ;
            
            self.$el
                .attr('class', getClass(self.model.get('state')))
                ;
            
            $(document.body)
                .bind('indom', self.indom)
                ;
            
            return;
        },
        
        indom: function () {
            
            var self = this;
            
            self.$status = self.$('.' + self.className + '-status');
            self.$name = self.$('.' + self.className + '-name');
            self.$text = self.$('.' + self.className + '-name-text');
            self.$count = self.$('.' + self.className + '-name-count');
            
            self.$name
                .hammer()
                .bind('tap dragstart drag dragend swipeRight', self.touch)
                ;
            
            self.$name.get(0).addEventListener('webkitTransitionEnd', function(e){
                
                if (self.$name.css('-webkit-transform') === 'matrix(1, 0, 0, 1, 0, 0)')
                {
                    self.animationEnd();
                }
                
            });
            
            return;
        },
        
        render: function () {
            
            var self = this,
                i_0 = self.model.collection.indexOf(self.model);
            
            self.$el
                .html(self.template.render(self.model.toJSON()))
                ;
            
            // Set the index of this model at render time (used for calculating tranlation)
            self.model
                .set({
                    index: i_0,
                    index_0: i_0
                })
                ;
            
            return self;
        },
        
        touch: function (e) {
            
            var self = this;
            
            //window.$debug.html(e.type);
            
            if (!_.isFunction(self[e.type]))
            {
                return;
            }
            
            self[e.type](e);
            
            return;
        },
        
        tap: function (e) {
            
            var self = this;
            
            if (isEditing)
            {
                return;
            }
            
            isEditing = true;
            
            self.$el.siblings('.' + self.className)
                .css({
                    opacity: 0.30
                })
                .addClass(C_FADE)
                ;
            
            self.$text
                .html('<input value="' + self.model.get('name') + '" maxlength="15" />')
                ;
            
            self.$('input')
                .focus()
            .get(0)
                .setSelectionRange(0, 15)
                ;
            
            return;
        },
        
        blur: function () {
            
            var self = this,
                val = self.$('input').val();
            
            isEditing = false;
            
            $('.' + self.className + '')
                .css({
                    opacity: 1.00
                })
                .removeClass(C_FADE)
                ;
            
            if (_.isEmpty(val))
            {
                self.model.destroy();
                self.remove();
                
                return;
            }
            
            self.$text
                .html(val)
                ;
            
            self.model
                .set({
                    name: val
                })
                ;
            
            return;
        },
        
        drag: function (e) {
            
            var self = this,
                buffer = 55,
                dx = e.distanceX,
                dy = e.distanceY;
            
            if (Math.abs(dx) <= 0
                || isEditing)
            {
                return;
            }
            
            if (dx >= buffer)
            {
                self.model
                    .set({
                        isSwiping: true
                    })
                    ;
                
                dx = buffer + (dx - buffer)/4;
            }
            else if (dx <= -buffer)
            {
                dx = -buffer + (dx + buffer)/4;
            }
            
            if (dx < buffer)
            {
                self.model
                    .set({
                        isSwiping: false
                    })
                    ;
            }
            
            self.$name
                .css('-webkit-transform', 'translate3d(' + dx + 'px, 0, 0)')
                ;
            
            return;
        },
        
        dragend: function () {
            
            var self = this;
            
            self.$name
                .css('-webkit-transform', 'translate3d(0, 0, 0)')
                ;
            
            return;
        },
        
        animationEnd: function () {
            
            var self = this;
            
            if (!self.model.get('isSwiping')
                || self.model.isLocked())
            {
                return;
                
            }
            
            self.model
                .set({
                    isSwiping: false
                })
                .toggleState()
                ;
            
            self.model.collection.align();
            
            return;
        },
        
        sort: function () {
            
            var self = this,
                i = self.model.get('index'),
                i_0 = self.model.get('index_0'),
                dy;
            
            if (_.isUndefined(i_0))
            {
                return;
            }
            
            dy = (i - i_0)*60;
            
            self.$el
                .css({
                    'z-index': '999',
                    '-webkit-transform': 'translate3d(0, '+ dy +'px, 0)'
                })
                ;
            
            return;
        },
        
        change_isSwiping: function (model, isSwiping) {
            
            var self = this;
            
            if (self.model.isLocked())
            {
                return;
            }
            
            if (isSwiping)
            {
                self.$el
                    .attr('class', getClass(self.model.getToggleState()))
                    ;
                
                return;
            }
            
            self.$el
                .attr('class', getClass(self.model.get('state')))
                ;
            
            return;
        },
        
        change_state: function () {
            
            var self = this;
            
            self.$el
                .attr('class', getClass(self.model.get('state')))
                ;
            
            self.$status
                .html(self.model.get('status'))
                ;
            
            self.$count
                .html(self.model.get('count'))
                ;
            
            return;
        },
        
        spread: function () {
            
            var self = this,
                i = self.model.get('index'),
                i_0 = self.model.get('index_0'),
                dy;
            
            dy = (-1 - i_0)*60;
            
            self.$el
                .css({
                    'z-index': '999',
                    '-webkit-transform': 'translate3d(0, '+ dy +'px, 0)'
                })
                ;
        }
        
    });
    
})();
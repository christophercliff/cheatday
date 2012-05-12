(function(){
    
    window.Vices = Backbone.Collection.extend({
        
        model: Vice,
        
        initialize: function () {
            
            var self = this;
            
            self
                .bind('remove', function(){
                    self.sort();
                }, self)
                ;
            
            return;
        },
        
        comparator: function (a, b) {
            
            var self = this,
                weights = {
                    on: 1,
                    off: 2,
                    locked: 3
                },
                aWeight = weights[a.get('state')],
                bWeight = weights[b.get('state')],
                diff = (aWeight === bWeight) ? b.cheats() - a.cheats() : aWeight - bWeight;
            
            if (diff > 0)
            {
                return 1;
            }
            
            if (diff < 0)
            {
                return -1;
            }
            
            return a.get('name') > b.get('name');
        },
        
        has: function (val) {
            return this.where({ name: val }).length > 0;
        },
        
        align: function () {
            
            var self = this;
            
            self.sort({ silent: true });
            
            self.each(function(v, i){
                
                v.set({
                    index: i
                });
                
            });
            
            return;
        },
        
        spread: function () {
            
            var self = this;
            
            self.each(function(vice){
                
                vice.trigger('spread');
                
            });
            
            return;
        },
        
        unspread: function () {
            
            var self = this;
            
            self.each(function(vice){
                
                vice.trigger('unspread');
                
            });
            
            return;
        }
        
    });
    
})();
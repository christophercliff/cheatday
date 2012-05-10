(function(){
    
    var STATES = {
            on: 'on',
            off: 'off',
            locked: 'locked'
        },
        FORMAT = 'YYYY-MM-DD',
        TODAY = moment().sod().format(FORMAT);
    
    window.Vice = Backbone.Model.extend({
        
        defaults: {
            state: STATES.off,
            count: 1,
            start: TODAY,
            used: [],
            cheatsPerRange: 1,
            range: 7,
        },
        
        initialize: function () {
            
            var self = this,
                state,
                status;
            
            if (self.lastCheat() === TODAY)
            {
                state = STATES.on;
            }
            else if (self.hasCheats())
            {
                state = STATES.off;
            }
            else
            {
                state = STATES.locked;
            }
            
            self.set({
                state: state,
                status: self.getStatus(state),
                count: self.cheats()
            });
            
            return;
        },
        
        hasCheats: function () {
            return this.cheats() > 0;
        },
        
        cheats: function () {
            
            var self = this,
                today = moment().sod(),
                start = moment(self.get('start')).sod(),
                diff = today.diff(start, 'days'),
                earned = Math.floor(diff*self.get('cheatsPerRange')/self.get('range')) + 1,
                used = self.get('used').length;
            
            return (earned - used < 0) ? 0 : earned - used;
        },
        
        lastCheat: function () {
            return this.get('used')[0];
        },
        
        nextCheat: function () {
            
            var self = this,
                today = moment().sod(),
                start = moment(self.get('start')).sod(),
                diff = today.diff(start, 'days'),
                earned = Math.floor(diff*self.get('cheatsPerRange')/self.get('range')) + 1,
                used = self.get('used').length;
            
            if (self.hasCheats())
            {
                return today.format(FORMAT);
            }
            
            return moment(today).add('days', self.get('range') - diff%self.get('range')).format(FORMAT);
        },
        
        isLocked: function () {
            return this.get('state') === STATES.locked;
        },
        
        getToggleState: function () {
            return this.get('state') === STATES.on ? STATES.off : STATES.on;
        },
        
        toggleState: function () {
            
            var self = this,
                state = self.getToggleState(),
                cheats = self.get('used');
            
            if (state === STATES.on)
            {
                cheats.push(moment().sod().format('YYYY-MM-DD'));
            }
            else
            {
                cheats.shift();
            }
            
            self.set({
                state: state,
                cheats: cheats,
                count: self.cheats(),
                status: self.getStatus(state)
            });
            
            return;
        },
        
        getStatus: function (state) {
            
            var self = this,
                status = '';
            
            switch (state)
            {
                case STATES.on:
                {
                    status = 'Undo';
                    
                    break;
                }
                case STATES.off:
                {
                    status = 'Cheat!';
                    
                    break;
                }
                case STATES.locked:
                {
                    status = moment(self.nextCheat()).from(moment().sod(), true).replace('a ', '1 ');
                    
                    break;
                }
            }
            
            return status;
        }
        
    });
    
})();
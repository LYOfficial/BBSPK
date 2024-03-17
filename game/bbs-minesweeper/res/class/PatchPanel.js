class PatchPanel {
    constructor () {
        this.boundDOM  = {
            game:  '',
            input: 'input:not([disabled])',
        };
        this.enable    = true;
        this.inputMode = false;
        this.focus     = []; 
        this.event     = {
            exit:      27,
            inventory: 69,
            hotbar_1:  49,
            hotbar_2:  50,
            hotbar_3:  51,
            hotbar_4:  52,
            hotbar_5:  53,
            hotbar_6:  54,
            hotbar_7:  55,
            hotbar_8:  56,
            hotbar_9:  57,
            hide_hud:  112,
            help:      113,
            debug:     114
        };
        this.__map     = [];
        this.player    = undefined;
        this.messager  = undefined;
    }

    open() {
        this.enable = true;
    }

    close() {
        this.enable = false;
    }

    init(player) {
        this.player = player;
        for (const key in this.event) {
            if (Object.hasOwnProperty.call(this.event, key)) {
                const e = this.event[key];
                this.__map[e] = key;
            }
        }
    }

    bind(game, input = 'input:not([disabled])') {
        this.boundDOM = {
            game:  game,
            input: input
        }
    }

    listen() {
        let that = this;
        $(document).on('keydown', function(e) {
            that.input(e);
        });
    }

    getFocus() {
        if (this.focus.length == 0) {
            return 'main'
        } else {
            return this.focus[0];
        }
    }

    newFocus(name) {
        this.focus.unshift(name);
    }

    removeFocus(name) {
        let i = this.focus.indexOf(name);
        if (i != -1) this.focus.splice(i, 1);
    }

    input(event) {
        // console.log(event.keyCode)
        // console.log(event)
        if (!this.enable) return;

        let focus = this.getFocus();

        switch (focus) {
            case 'main':
                switch (this.__map[event.keyCode]) {
                    case 'hotbar_1':
                        this.player.selectSlot(0);
                        break;
        
                    case 'hotbar_2':
                        this.player.selectSlot(1);
                        break;
                    
                    case 'hide_hud':
                        event.preventDefault();
                        if ($(this.boundDOM.game).hasClass('hide-hud') || $(this.boundDOM.game).hasClass('hide-hud-half')) {
                            $(this.boundDOM.game).removeClass('hide-hud hide-hud-half');
                        } else {
                            if (event.shiftKey) {
                                $(this.boundDOM.game).addClass('hide-hud-half');
                            } else {
                                $(this.boundDOM.game).addClass('hide-hud');
                            }
                        }
                        break;
        
                    case 'help':
                        event.preventDefault();
                        this.messager.send('[F1] Hide HUD');
                        this.messager.send('[Shift + F1] Half hide HUD');
                        this.messager.send('[F2] Help');
                        this.messager.send('[F3] Debug');
                        this.messager.send('[1 ~ 2] Select slot');
                        this.messager.send('[E] Open inventory');
                        break;
        
                    case 'inventory':
                        this.newFocus('inventory');
                        $(this.boundDOM.game + ' #gui-screen').removeClass('hide');
                        break;
        
                    case 'debug':
                        event.preventDefault();
                        if (game.debug.master) {
                            game.debug.master = false;
                        } else {
                            game.debug.master = true;
                        }
                        break;
                
                    default:
                        break;
                }
                break;

            case 'inventory':
                switch (this.__map[event.keyCode]) {
                    case 'exit':
                    case 'inventory':
                        this.removeFocus('inventory');
                        $(this.boundDOM.game + ' #gui-screen').addClass('hide');
                        break;
                
                    default:
                        break;
                }
                break;
        
            default:
                break;
        }
        
    }
}
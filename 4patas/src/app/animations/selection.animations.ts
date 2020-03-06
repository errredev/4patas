import { trigger, transition, animate, style, state } from '@angular/animations';


export const Seleccion = [
    trigger('seleccionado', [
        state('ok',
            style({
                transform: 'translatey(-20px) scale(1.3)',
            })
        ),
        // 3 - Comment this and Uncomment GROUPED ANIMATIONS to see them in action.
        transition('selected <=> *', [
            animate('300ms ease-in')
        ]),
        state('inicial',
            style({
                transform: 'scale(1)',
            })
        ),
        // 3 - Comment this and Uncomment GROUPED ANIMATIONS to see them in action.
        transition('ok <=> inicial', animate('200ms linear'))
])];

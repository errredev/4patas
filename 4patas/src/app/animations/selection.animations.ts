import { trigger, transition, animate, style, state } from '@angular/animations';


export const Seleccion = [
    trigger('seleccionado', [
        state('ok',
            style({
                transform: 'translatey(-20px) scale(1) ', background: '{{coloractivo}}', boxShadow: '0px 4px 4px black'
            }), { params: { coloractivo: 'ffffff' }} 
        ),
    
        state('inicial',
            style({
                transform: 'scale(0.9)', fill: '{{colorinactivo}}', background: '{{colorinactivo}}', boxShadow: '0px 0px 0px black'
            }), { params: { colorinactivo: 'ffffff' } } 
        ),
        // 3 - Comment this and Uncomment GROUPED ANIMATIONS to see them in action.
        transition('ok => inicial', animate('400ms ease-In')),
        transition('inicial => ok', animate('300ms ease-in'))
])];

import { trigger, transition, animate, style, state, keyframes } from '@angular/animations';

export const fotoSlide = [
    trigger('inOutAnimation', [
        state('activo',
            style({
                opacity: 1 
            })
        ),
        state('inicial',
            style({
                opacity: 0
            })
        ),
        transition('inicial => activo', animate('500ms ease-in' )),
        transition('activo => inicial', animate('500ms ease-out'))
    ])
];

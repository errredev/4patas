import { trigger, transition, animate, style, state } from '@angular/animations';

export const Accordion = [trigger (
    'inOutAnimation',
    [
        transition(
            ':enter',
            [
                style({ height: 0, opacity: 0 }),
                animate('0.2s ease-out',
                style({ height: 100, opacity: 1 }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ height: 100, opacity: 1 }),
                animate('0.2s ease-in',
                style({ height: 0, opacity: 0 }))
            ]
        )
    ]
),
    // trigger('changeDivSize', [
    //     state(
    //         'initial',
    //         style({
    //             width: '100%',
    //             height: '0%'
    //         })
    //     ),
    //     state(
    //         'final',
    //         style({
    //             width: '100%',
    //             height: '100px'
    //         })
    //     ),
    //     transition('initial=>final', animate('200ms')),
    //     transition('final=>initial', animate('200ms'))
    // ]),
    // trigger('changevisible', [
    //     state(
    //         'initial',
    //         style({
    //             opacity: 0
    //         })
    //     ),
    //     state(
    //         'final',
    //         style({
    //             opacity: 1
    //         })
    //     ),
    //     transition('initial=>final', animate('200ms')),
    //     transition('final=>initial', animate('200ms'))
    // ])
];


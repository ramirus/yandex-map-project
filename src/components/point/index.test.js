import 'jsdom-global/register';
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import Point from './index';

configure({adapter: new Adapter()});

describe("Point", () => {
    let props;
    let mountedScreen;
    const screen = () => {
        if (!mountedScreen) {
            mountedScreen = mount(
                <Point {...props} />
            );
        }
        return mountedScreen;
    };

    beforeEach(() => {
        props = {
            label: undefined,
            index: undefined,
            removePoint: () => {},
            provided: {
                draggableProps: {}
            },
            snapshot: {},
        };
        mountedScreen = undefined;
    });

    it("always renders a .point", () => {
        const block = screen().find(".point");
        expect(block.length).toBeGreaterThan(0);
    });

    describe('point block', () => {
        const testFunc = jest.fn();
        const message = 'Test message';

        beforeEach(() => {
            props.label = message;
            props.index = 7;
            props.removePoint = testFunc;
        });

        it('when label is passed', () => {
            const input = screen().find(".point-label");
            expect(input.text()).toEqual(message);
        });

        it('call remove func', () => {
            const removeButton = screen().find(".point-remove-icon");
            removeButton.simulate('click');
            expect(testFunc).toHaveBeenCalled();
        });

        it('call remove func with param', () => {
            const removeButton = screen().find(".point-remove-icon");
            removeButton.simulate('click');
            expect(testFunc).toHaveBeenCalledWith(7);
        });
    })
});
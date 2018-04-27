import 'jsdom-global/register';
import React from "react";
import { mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import InputBox from './index';

configure({ adapter: new Adapter() });

describe("InputBox", () => {
    let props;
    let mountedScreen;
    const appScreen = () => {
        if (!mountedScreen) {
            mountedScreen = mount(
                <InputBox {...props} />
            );
        }
        return mountedScreen;
    };

    beforeEach(() => {
        props = {
            handlePointSubmit: () => {},
        };
        mountedScreen = undefined;
    });

    it("always renders a form", () => {
        const block = appScreen().find("form");
        expect(block.length).toBeGreaterThan(0);
    });

    it("always renders a input", () => {
        const block = appScreen().find("input");
        expect(block.length).toBeGreaterThan(0);
    });

    describe('inputBox form', () => {
        const submitFunc = jest.fn();

        beforeEach(() => {
            props.handlePointSubmit = submitFunc;
        });

        it('input change', () => {
            const input = appScreen().find("input");
            const message = 'Test message';
            input.simulate('change', { target: { value: message } })
            expect(appScreen().state('inputValue')).toEqual(message);
        });

        it('submit it', () => {
            const form = appScreen().find("form");
            form.simulate('submit');
            expect(submitFunc).toHaveBeenCalled();
        });

        it('clean input value after submit', () => {
            const input = appScreen().find("input");
            const form = appScreen().find("form");
            input.simulate('change', { target: { value: 'Test message' } })
            form.simulate('submit');
            expect(appScreen().state('inputValue')).toEqual('');
        });
    })
});
import 'jsdom-global/register';
import React from "react";
import { mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import App from './index';

configure({ adapter: new Adapter() });

describe("App", () => {
    let props;
    let mountedAppScreen;
    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <App {...props} />
            );
        }
        return mountedAppScreen;
    }

    beforeEach(() => {
        props = {
            wallpaperPath: undefined,
            userInfoMessage: undefined,
            onUnlocked: undefined,
        };
        mountedAppScreen = undefined;
    });

    it("always renders a .app-container", () => {
        const divs = appScreen().find(".app-container");
        expect(divs.length).toBeGreaterThan(0);
    });

    // it("always renders a `ControlContainer`", () => {
    //     expect(appScreen().find(InputBox).length).toBe(1);
    // });
    //
    // it("always renders a `PointList`", () => {
    //     expect(appScreen().find(PointList).length).toBe(1);
    // });


    // describe("when `onUnlocked` is defined", () => {
    //     beforeEach(() => {
    //         props.onUnlocked = jest.fn();
    //     });
    //
    //     it("sets the rendered `SlideToUnlock`'s `onSlide` prop to the same value as `onUnlocked`'", () => {
    //         const slideToUnlock = lockScreen().find(SlideToUnlock);
    //         expect(slideToUnlock.props().onSlide).toBe(props.onUnlocked);
    //     });
    // });
    //
    // describe("when `onUnlocked` is undefined", () => {
    //     beforeEach(() => {
    //         props.onUnlocked = undefined;
    //     });
    //
    //     it("sets the rendered `SlideToUnlock`'s `onSlide` prop to undefined'", () => {
    //         const slideToUnlock = lockScreen().find(SlideToUnlock);
    //         expect(slideToUnlock.props().onSlide).not.toBeDefined();
    //     });
    // });
});
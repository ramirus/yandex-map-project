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
});